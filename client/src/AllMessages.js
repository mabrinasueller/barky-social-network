import axios from "./axios";
import { useState, useEffect } from "react";

export default function Messages() {
    const [allMessages, setAllMessages] = useState([]);
    const [singleThread, setSingleThread] = useState([]);

    useEffect(() => {
        console.log("component did mount!");
        (async () => {
            try {
                const { data } = await axios.get("/all/messages");
                console.log("data from all messages: ", data);
                setAllMessages(data);
            } catch (error) {
                console.log("Error in getting messages: ", error);
            }
        })();
    }, []);

    const singleThreadMessages = async () => {
        console.log("user got clicked");
        try {
            const { data } = axios.get("/user/messages");
            console.log("data from single user: ", data);
            setSingleThread(data);
        } catch (error) {
            console.log("Error when getting single thread: ", error);
        }
    };

    return (
        <>
            <div className="profile-content">
                <div className="profile">
                    <div className="profile-text-container">
                        {/* {allMessages && allMessages.map((message) => )} */}
                    </div>
                </div>
                <div className="profile">
                    <div className="profile-text-container">
                        {/* {allMessages && allMessages.map((message) => )} */}
                    </div>
                </div>
            </div>
        </>
    );
}
