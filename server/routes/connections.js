const { app } = require("../server");
const {
    getConnection,
    insertConnection,
    updateConnection,
    deleteConnection,
} = require("../db");

app.get("/connections/:viewedUser", async (req, res) => {
    const loggedInUser = req.session.userId;
    const { viewedUser } = req.params;
    const { rows } = await getConnection(loggedInUser, viewedUser);

    if (rows.length === 0) {
        return res.status(200).json({
            btnText: "Add as friend",
        });
    }
    if (rows[0].accepted) {
        return res.status(200).json({
            btnText: "Unfriend",
        });
    }
    if (!rows[0].accepted) {
        if (rows[0].recipient_id === loggedInUser) {
            return res.status(200).json({
                btnText: "Accept",
            });
        } else {
            return res.status(200).json({
                btnText: "Cancel friend request",
            });
        }
    }
});

app.post("/connections", async (req, res) => {
    const loggedInUser = req.session.userId;
    const { btnText, viewedUser } = req.body;

    try {
        if (btnText === "Add as friend") {
            await insertConnection(loggedInUser, viewedUser);
            return res.json({
                btnText: "Cancel friend request",
            });
        }
        if (btnText === "Accept") {
            await updateConnection(loggedInUser, viewedUser);
            return res.json({
                btnText: "Unfriend",
            });
        }
        if (
            btnText === "Cancel friend request" ||
            btnText === "Unfriend" ||
            btnText === "Decline friend request"
        ) {
            await deleteConnection(loggedInUser, viewedUser);
            return res.json({
                btnText: "Add as Friend",
            });
        }
    } catch (error) {
        console.log("error: ", error);
        return res.status(500).json({
            error: "Error in /friends route",
        });
    }
});
