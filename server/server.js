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

const { getUser, newImage } = require("./db");

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

app.use(
    cookieSession({
        secret: cookieSecret,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);
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
            const { rows } = await newImage(fullUrl, userId);
            res.json(rows[0]);
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

io.on("connection", function (socket) {
    console.log(`socket with the id ${socket.id} is now connected`);

    socket.on("disconnect", function () {
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });

    socket.emit("Hello", {
        message: "Bonjour",
    });

    socket.on("thanks", function (data) {
        console.log(data);
    });

    socket.emit("welcome", {
        message: "Welome. It is nice to see you",
    });
});
