const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");

const { newUser, registeredUser } = require("../db");

// const s3 = require("../s3");
// const { s3Url } = require("../config.json");
// const multer = require("multer");
// const uidSafe = require("uid-safe");

// const diskStorage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, __dirname + "/uploads");
//     },
//     filename: function (req, file, callback) {
//         uidSafe(24).then(function (uid) {
//             callback(null, uid + path.extname(file.originalname));
//         });
//     },
// });

// const uploader = multer({
//     storage: diskStorage,
//     limits: {
//         fileSize: 2097152, //files over 2mb can't be uploaded
//     },
// });
const { hash, compare } = require("../utils/bc");

const cookieSession = require("cookie-session");
// const cookieSecret = require("../secrets.json")["COOKIE_SECRET"];
let cookieSecret;
if (process.env.COOKIE_SECRET) {
    cookieSecret = process.env.COOKIE_SECRET;
} else {
    cookieSecret = require("../secrets.json")[0];
}

app.use(
    cookieSession({
        secret: cookieSecret,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

const csurf = require("csurf");
app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.post("/registration", (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);
    hash(password).then((hashedPassword) => {
        console.log(hashedPassword);
        newUser(firstName, lastName, email, hashedPassword)
            .then((result) => {
                const { id } = result?.rows[0];
                req.session.userId = id;
                console.log("result", result);
                console.log("result", result.rows);
                console.log("result", result.rows[0]);
                // res.json(result);
                res.json({ success: true });
            })
            .catch((error) => console.log("error was thrown: ", error));
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    registeredUser(email, password).then((result) => {
        compare(password, result.rows[0].password_hash).then((match) => {
            if (match) {
                console.log("match", match);
            } else {
                console.log("error thrown");
            }
        });
    });
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
