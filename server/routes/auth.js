const { app } = require("../server");
const { hash, compare } = require("../bc");
const { createUser, registeredUser } = require("../db");

app.post("/registration", (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    hash(password).then((hashedPassword) => {
        createUser(firstName, lastName, email, hashedPassword)
            .then(({ rows }) => {
                req.session.userId = rows[0].id;
                res.json({ success: true, userId: rows[0] });
            })
            .catch((error) => console.log("error was thrown: ", error));
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    registeredUser(email, password)
        .then(({ rows }) => {
            compare(password, rows[0].password_hash)
                .then((match) => {
                    if (match) {
                        req.session.userId = rows[0].id;
                        req.session.fname = rows[0].first_name;
                        res.json({ success: true });
                    } else {
                        console.log("error thrown");
                    }
                })
                .catch((error) => {
                    console.log("error: ", error);
                    res.status(500).json({
                        error: "Error thrown in login-route",
                    });
                });
        })
        .catch((error) => {
            console.log("error: ", error);
            res.status(500).json({ error: "Error thrown in login-route" });
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});
