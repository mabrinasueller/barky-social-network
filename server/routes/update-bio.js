const { app } = require("../server");
const { updateBio } = require("../db");

app.post("/update-bio", async (req, res) => {
    const { bio } = req.body;
    const { userId } = req.session;
    try {
        const { rows } = await updateBio(bio, userId);
        res.json(rows[0]);
    } catch (error) {
        console.log("Error in bio update: ", error);
        res.status(500).json({ error: "Error in /update-bio route" });
    }
});
