const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    const { AWS_KEY, AWS_SECRET } = require("../secrets")[0]; // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: "AWS_KEY",
    secretAccessKey: "AWS_SECRET",
    region: "eu-west-1",
});

module.exports.sendEmail = (recipient, message, subject) => {
    return ses
        .sendEmail({
            Source: "Sabrina Müller <muellersabrina2109@gmail.com>",
            Destination: {
                ToAddresses: [recipient],
            },
            Message: {
                Body: {
                    Text: {
                        Data: message,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        })
        .promise()
        .then(() => console.log("it worked!"))
        .catch((err) => console.log(err));
};
