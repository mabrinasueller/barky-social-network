const { app } = require("../server");
const { getFriendsAndRequests, getFriendsOfOtherUsers } = require("../db");

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

app.get("/friends/others/:viewedUser", async (req, res) => {
    const { viewedUser } = req.params;
    // console.log("viewedUser", viewedUser);

    try {
        const { rows } = await getFriendsOfOtherUsers(viewedUser);
        // console.log("rows in friends: ", rows[0]);
        res.json(rows);
    } catch (error) {
        console.log("Error in friends of others: ", error);
    }
});
