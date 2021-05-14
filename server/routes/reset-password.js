const { app } = require("../server");
const {
    registeredUser,
    checkVerificationCode,
    updatePassword,
    insertCode,
} = require("../db");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("../ses");
const { hash } = require("../bc");

app.post("/password/reset/start", async (req, res) => {
    try {
        const { rows } = await registeredUser(req.body.email);
        if (rows.length > 0) {
            const secretCode = cryptoRandomString({
                length: 6,
            });
            const email = rows[0].email;
            const otherResults = await insertCode(secretCode, email);
            console.log(otherResults);
            if (otherResults.rows.length > 0) {
                sendEmail(
                    otherResults.rows[0].email,
                    `Your verification code to reset your password is: ${otherResults.rows[0].code}`,
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
        } else {
            res.status(500).json({
                error: "Error: invalid Email",
            });
        }
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            error: "Error in /password/reset/start route",
        });
    }
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
                                console.log("error: ", error);
                                res.status(500).json({
                                    error:
                                        "Error in /password/reset/verify route",
                                });
                            });
                    })
                    .catch((error) => {
                        console.log("error: ", error);
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
            console.log("error: ", error);
            res.status(500).json({
                error: "Error in /password/reset/verify route",
            });
        });
});
