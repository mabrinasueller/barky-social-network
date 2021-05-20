const express = require("express");
const app = express();
module.exports.app = app;

const cookieSession = require("cookie-session");
const compression = require("compression");
const path = require("path");
const csurf = require("csurf");

const {
    getUser,
    newImage,
    updateBio,
    getOtherUsers,
    getConnection,
    insertConnection,
    updateConnection,
    deleteConnection,
    getFriendsAndRequests,
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

//requiring login and registration

require("./routes/auth");

//requiring Password reset routes

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

app.post("/update-bio", async (req, res) => {
    const { bio } = req.body;
    const { userId } = req.session;
    try {
        const { rows } = await updateBio(bio, userId);
        res.json(rows[0]);
    } catch (error) {
        console.log("Error in bio update: ", error);
        res.status(500).json({ error: "Error in /update-bio route" });
    }
});

app.get("/other-user/:id", async (req, res) => {
    const { id } = req.params;
    if (parseInt(id) === req.session.userId) {
        res.status(400).json({
            error: "User is trying to access his own profile via Url",
        });
        return;
    }
    try {
        const { rows } = await getOtherUsers(id);
        if (rows.length === 0) {
            res.status(400).json({
                error: "User is trying to access a non-existing url",
            });
            return;
        }
        res.json(rows[0]);
    } catch (error) {
        console.log("error: ", error);
    }
});

require("../server/routes/user-search");

app.get("/connections/:viewedUser", async (req, res) => {
    const loggedInUser = req.session.userId;
    const { viewedUser } = req.params;
    const { rows } = await getConnection(loggedInUser, viewedUser);

    if (rows.length === 0) {
        return res.status(200).json({
            btnText: "Add as friend",
        });
    }
    if (rows[0].accepted) {
        return res.status(200).json({
            btnText: "Unfriend",
        });
    }
    if (!rows[0].accepted) {
        if (rows[0].recipient_id === loggedInUser) {
            return res.status(200).json({
                btnText: "Accept friend request",
            });
        } else {
            return res.status(200).json({
                btnText: "Cancel friend request",
            });
        }
    }
});

app.post("/connections", async (req, res) => {
    const loggedInUser = req.session.userId;
    const { btnText, viewedUser } = req.body;

    try {
        if (btnText === "Add as friend") {
            await insertConnection(loggedInUser, viewedUser);
            return res.json({
                btnText: "Cancel friend request",
            });
        }
        if (btnText === "Accept friend request") {
            await updateConnection(loggedInUser, viewedUser);
            return res.json({
                btnText: "Unfriend",
            });
        }
        if (
            btnText === "Cancel friend request" ||
            btnText === "Unfriend" ||
            btnText === "Decline friend request"
        ) {
            await deleteConnection(loggedInUser, viewedUser);
            return res.json({
                btnText: "Add as Friend",
            });
        }
    } catch (error) {
        console.log("error: ", error);
        return res.status(500).json({
            error: "Error in /friends route",
        });
    }
});

app.get("/friends-requests", async (req, res) => {
    const { userId } = req.session;
    console.log("UserId: ", userId);
    try {
        const { rows } = await getFriendsAndRequests(userId);
        console.log("rows: ", rows);
        res.json(rows);
    } catch (error) {
        console.log("Error in /friends-requests route: ", error);
    }
});

app.get("*", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("Server is listening.");
});
