// const { app } = require("../server");
// const { newImage } = require("../db");

// const s3 = require("../s3");
// const { s3Url } = require("../config.json");
// const multer = require("multer");
// const uidSafe = require("uid-safe");
// const path = require("path");

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

// app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
//     console.log("upload worked!");
//     if (req.file) {
//         const { filename } = req.file;
//         const { userId } = req.session;
//         console.log(userId);
//         var fullUrl = s3Url + filename;
//         console.log("fullUrl: ", fullUrl);
//         newImage(fullUrl, userId)
//             .then((response) => {
//                 // console.log("response: ", response.rows[0]);
//                 res.json(response.rows[0]);
//             })
//             .catch((error) => {
//                 console.log("error: ", error);
//                 res.status(500).json({ error: "Error in /upload/route" });
//             });
//     } else {
//         res.json({ success: false });
//     }
// });
