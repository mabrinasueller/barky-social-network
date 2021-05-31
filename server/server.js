const express = require("express");
const app = express();
module.exports.app = app;
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

const cookieSession = require("cookie-session");
const compression = require("compression");
const path = require("path");
const csurf = require("csurf");

const {
    getUser,
    newImage,
    insertChatMessage,
    getLastChats,
    deleteUserConnections,
    deleteUserChats,
    deleteUserInfos,
    insertWallPost,
    getWallPosts,
} = require("./db");

const s3 = require("./s3");
const { s3Url } = require("./config.json");
const multer = require("multer");
const uidSafe = require("uid-safe");

let cookieSecret;
if (process.env.COOKIE_SECRET) {
    cookieSecret = process.env.COOKIE_SECRET;
} else {
    cookieSecret = require("../secrets.json")[0].COOKIE_SECRET;
}

// app.use(
//     cookieSession({
//         secret: cookieSecret,
//         maxAge: 1000 * 60 * 60 * 24 * 14,
//     })
// );

const cookieSessionMiddleware = cookieSession({
    secret: cookieSecret,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use((req, res, next) => {
    res.locals.fname = req.session.fname;
    next();
});

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152, //files over 2mb can't be uploaded
    },
});

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

require("./routes/auth");
require("./routes/reset-password");

app.get("/user", async (req, res) => {
    const { userId } = req.session;
    try {
        const { rows } = await getUser(userId);
        res.json(rows[0]);
    } catch (error) {
        console.log("error: ", error);
    }
});

app.post("/upload", uploader.single("file"), s3.upload, async (req, res) => {
    if (req.file) {
        const { filename } = req.file;
        const { userId } = req.session;
        var fullUrl = s3Url + filename;
        try {
            const result = await getUser(userId);
            if (result.rows[0].img_url != null) {
                await s3.delete(result.rows[0].img_url);
                const { rows } = await newImage(fullUrl, userId);
                res.json(rows[0]);
            } else {
                const { rows } = await newImage(fullUrl, userId);
                res.json(rows[0]);
            }
        } catch (error) {
            console.log("error: ", error);
            res.status(500).json({ error: "Error in /upload/route" });
        }
    }
});

require("../server/routes/update-bio");
require("../server/routes/other-profiles");
require("../server/routes/user-search");
require("../server/routes/connections");
require("../server/routes/friend-requests");

app.post("/delete", async (req, res) => {
    const { userId } = req.session;
    try {
        const result = await getUser(userId);
        result.rows[0].img_url && (await s3.delete(result.rows[0].img_url));
        await deleteUserChats(userId);
        await deleteUserConnections(userId);
        await deleteUserInfos(userId);
        req.session = null;
        res.redirect("/welcome");
    } catch (error) {
        console.log(("Error in /delete- route:", error));
    }
});

app.post("/wall/posts", async (req, res) => {
    const { userId } = req.session;
    const { viewedUser, post } = req.body;
    console.log("req.body", req.body);

    try {
        const { rows } = await insertWallPost(userId, viewedUser, post);
        console.log("rows from inserting wallpost: ", rows);
        res.json(rows[0]);
    } catch (error) {
        console.log("Error in /wall/posts-route: ", error);
    }
});

app.get("/profile/wallposts/:viewedUser", async (req, res) => {
    const { userId } = req.session;
    const { viewedUser } = req.params;
    console.log("req.params", req.params);

    try {
        const { rows } = await getWallPosts(viewedUser);
        console.log("rows from getting wallpost: ", rows);
        res.json(rows[0].reverse());
    } catch (error) {
        console.log("Error in /profile/wallposts: ", error);
    }
});

app.get("*", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

server.listen(process.env.PORT || 3001, function () {
    console.log("Server is listening.");
});

const onlineUsers = {};
io.on("connection", function (socket) {
    console.log(`socket with id ${socket.id} is connected`);
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.userId;
    console.log("userId: ", userId);
    onlineUsers[socket.id] = userId;
    console.log("onlineUsers: ", onlineUsers);
    console.log(`User ${userId} just connected with socket ${socket.id}`);

    (async () => {
        try {
            const { rows } = await getLastChats();
            io.sockets.emit("chatMessages", rows.reverse());
        } catch (error) {
            console.log("Error in new Message: ", error);
        }
    })();

    socket.on("disconnect", () => {
        console.log(
            `User ${userId} just disconnected with socket ${socket.id}`
        );
        delete onlineUsers[socket.id];
    });

    socket.on("chatMessage", async (msg) => {
        const message = msg;

        try {
            const result = await insertChatMessage(message, userId);
            const { rows } = await getUser(userId);

            const dataForChat = {
                message: result.rows[0].message,
                created_at: result.rows[0].created_at,
                first_name: rows[0].first_name,
                last_name: rows[0].last_name,
                img_url: rows[0].img_url,
            };

            io.sockets.emit("chatMessage", dataForChat);
        } catch (error) {
            console.log("Error at inserting chat-message: ", error);
        }
    });
});
