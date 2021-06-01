const { app } = require("../server");
const { hash, compare } = require("../bc");
const {
    createUser,
    registeredUser,
    updateUser,
    updatePassword,
} = require("../db");

app.post("/registration", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const hashedPassword = await hash(password);
        const { rows } = await createUser(
            firstName,
            lastName,
            email,
            hashedPassword
        );
        req.session.userId = rows[0].id;
        res.json({ success: true, userId: rows[0] });
    } catch (error) {
        console.log("error was thrown: ", error);
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const { rows } = await registeredUser(email, password);
        const match = await compare(password, rows[0].password_hash);

        if (match) {
            req.session.userId = rows[0].id;
            req.session.fname = rows[0].first_name;
            res.json({ success: true });
        } else {
            console.log("error thrown: ");
            res.json({ success: false });
        }
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            error: "Error thrown in login-route",
        });
    }
});

app.post("/edit", async (req, res) => {
    const { userId } = req.session;
    console.log("userId", userId);
    const {
        firstName,
        first_name,
        lastName,
        last_name,
        email,
        password,
    } = req.body;

    console.log("req.body", req.body);

    try {
        if (password) {
            const hashedPassword = await hash(password);
            const { rows } = await updatePassword(hashedPassword, email);
            await updateUser(firstName, lastName, email, userId);
            console.log("rows from pw-update: ", rows);
            res.json(rows[0]);
        } else {
            const { rows } = await updateUser(
                firstName || first_name,
                lastName || last_name,
                email,
                userId
            );
            res.json(rows[0]);
        }
    } catch (error) {
        console.log("Error in inserting updated user: ", error);
    }
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});
