const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets.json")[1]; // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.upload = (req, res, next) => {
    if (!req.file) {
        return res.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "mabrinasbucket",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            // it worked!!!
            console.log("amazon upload complete");
            fs.unlink(path, () => {}); //deletes file after upload to Amazon
            next();
        })
        .catch((err) => {
            console.log("err in s3 upload put object: ", err);
            res.sendStatus(404);
        });
};

exports.delete = (imgUrl) => {
    return s3
        .deleteObject({ Bucket: "mabrinasbucket", Key: "imgUrl" })
        .promise()
        .then(() => {
            console.log("File deleted successfully");
        });
};

// exports.delete = async (imgUrl) => {
//     try {
//         await s3
//             .deleteObject({ Bucket: "mabrinasbucket", Key: imgUrl })
//             .promise();
//         console.log("File deleted successfully");
//     } catch (error) {
//         console.log("Error in deleting file: ", error);
//     }
// };
