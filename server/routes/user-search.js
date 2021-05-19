const { getNewestUsers, getMatchingUsers } = require("../db");
const { app } = require("../server");

app.get("/find/users", async (req, res) => {
    try {
        const { rows } = await getNewestUsers();
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            error: "Error in /find/users route",
        });
    }
});

app.post("/find/users", async (req, res) => {
    const { inputField } = req.body;
    try {
        const { rows } = await getMatchingUsers(inputField);
        console.log(rows);
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            error: "Error in /find/users route",
        });
    }
});
