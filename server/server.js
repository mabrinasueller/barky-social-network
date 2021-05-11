const express = require("express");
const app = express();
module.exports.app = app;
const { hash, compare } = require("./bc");
const compression = require("compression");
const path = require("path");
const csurf = require("csurf");

const {
    checkVerificationCode,
    updatePassword,
    insertCode,
    registeredUser,
} = require("./db");
const cryptoRandomString = require("crypto-random-string");

const { sendEmail } = require("./ses");
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

const cookieSession = require("cookie-session");
// const cookieSecret = require("../secrets.json")["COOKIE_SECRET"];
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

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

//requiring login and registration

require("./routes/auth");

//requiring Password reset routes

// require("./routes/reset-password");

app.post("/password/reset/start", (req, res) => {
    registeredUser(req.body.email)
        .then((result) => {
            console.log("req.body.email", req.body.email);
            console.log("result", result.rows.length);
            if (result.rows.length > 0) {
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                const email = result.rows[0].email;
                insertCode(secretCode, email)
                    .then(({ rows }) => {
                        if (rows.length > 0) {
                            sendEmail(
                                rows[0].email,
                                `Your verification code to reset your password is: ${rows[0].code}`,
                                "Your verfication code"
                            );
                            res.status(200).json({
                                success: "Verification email successfully sent",
                            });
                        } else {
                            res.status(500).json({
                                error: "Error when inserting verification code",
                            });
                        }
                    })
                    .catch((error) => {
                        console.log("error: ", error);
                        res.status(500).json({
                            error: "Error in insertCode",
                        });
                    });
            } else {
                res.status(500).json({
                    error: "Error: invalid Email",
                });
            }
        })
        .catch((error) => {
            console.log("error: ", error);
            res.status(500).json({
                error: "Error in /password/reset/start route",
            });
        });
});

app.post("/password/reset/verify", (req, res) => {
    const { email, password, code } = req.body;
    checkVerificationCode(email)
        .then((result) => {
            if (result.rows[0].code === code) {
                hash(password)
                    .then((hashedPassword) => {
                        updatePassword(hashedPassword, email)
                            .then(() => {
                                res.status(200).json({
                                    success:
                                        "New password inserted successfully",
                                });
                            })
                            .catch((error) => {
                                res.status(500).json({
                                    error:
                                        "Error in /password/reset/verify route",
                                });
                            });
                    })
                    .catch((error) => {
                        res.status(500).json({
                            error: "Error in /password/reset/verify route",
                        });
                    });
            } else {
                res.status(500).json({
                    error: "Error: invalid Email",
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                error: "Error in /password/reset/verify route",
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
