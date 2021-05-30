import axios from "./axios";

export async function getFriendsRequests() {
    try {
        const { data } = await axios.get("/friends-requests");
        console.log("data from friends & requests: ", data);
        return {
            type: "FRIENDS_REQUESTS",
            users: data,
        };
    } catch (error) {
        console.log("Error in connections-axios-route: ", error);
    }
}

export async function addFriend(id) {
    const btnText = "Accept";
    console.log("Button clicked");
    try {
        const { data } = await axios.post("/connections", {
            viewedUser: id,
            btnText,
        });
        console.log("data from adding user: ", data);
        return {
            type: "ACCEPT_REQUEST",
            id,
        };
    } catch (error) {
        console.log("Error in adding-friend-action: ", error);
    }
}

export async function unfriend(id) {
    const btnText = "Unfriend";
    try {
        const { data } = await axios.post("/connections", {
            viewedUser: id,
            btnText,
        });
        console.log("data from unfriend user: ", data);
        return {
            type: "UNFRIEND_USER",
            id,
        };
    } catch (error) {
        console.log("Error in removing friend-action: ", error);
    }
}

export async function cancelRequest(id) {
    const btnText = "Cancel friend request";
    try {
        const { data } = await axios.post("/connections", {
            viewedUser: id,
            btnText,
        });
        console.log("data in cancel: ", data);
    } catch (error) {
        console.log("Error in cancel-route: ", error);
    }
}

export async function chatMessage(msg) {
    // console.log("message", msg);
    return {
        type: "NEW_MESSAGE",
        msg,
    };
}

export async function chatMessages(msgs) {
    // console.log("messages", msgs);
    return {
        type: "LAST_MESSAGES",
        payload: msgs,
    };
}

// export async function getProfilePosts() {
//     try {
//         const { data } = await axios.get("/profile/wallposts");
//         console.log("data: ", data);
//     } catch (error) {
//         console.log("error: ", error);
//     }
// }

// export async function otherUser(id) {
//     try {
//         const { data } = await axios.get(`/other-user/${id}`);
//         return {
//             type: "OTHER_USER_BIO",
//             data,
//         };
//     } catch (error) {
//         console.log("error in otherUser-action: ", error);
//         history.push("/");
//     }
// }
