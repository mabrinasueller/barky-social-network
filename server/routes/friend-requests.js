const { app } = require("../server");
const { getFriendsAndRequests } = require("../db");

app.get("/friends-requests", async (req, res) => {
    const { userId } = req.session;
    try {
        const { rows } = await getFriendsAndRequests(userId);
        console.log("rows", rows);
        res.json(rows);
    } catch (error) {
        console.log("Error in /friends-requests route: ", error);
    }
});
