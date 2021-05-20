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
    try {
        const { data } = await axios.post("/friends");
        console.log("data from adding user: ", data);
        return {
            type: "ACCEPT_REQUEST",
            id: id,
        };
    } catch (error) {
        console.log("Error in adding-friend-action: ", error);
    }
}

export async function unfriend(id) {
    try {
        const { data } = await axios.post();
        console.log("data from unfriend user: ", data);
        return {
            type: "UNFRIEND_USER",
            id: id,
        };
    } catch (error) {
        console.log("Error in removing friend-action: ", error);
    }
}
