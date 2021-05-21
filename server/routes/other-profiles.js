const { app } = require("../server");
const { getOtherUsers } = require("../db");

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
