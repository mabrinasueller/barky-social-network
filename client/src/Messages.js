import axios from "./axios";
import { useState, useEffect } from "react";

export default function Messages() {
    const [allMessages, setAllMessages] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("/user/messages");
                console.log("data from all messages: ", data);
                setAllMessages(data);
            } catch (error) {
                console.log("Error in getting messages: ", error);
            }
        })();
    }, []);

    return (
        <>
            <h1>Test for Messages</h1>
            <div className="profile-content">
                <div className="profile">
                    <div className="profile-text-container">
                        {/* {allMessages && allMessages.map((message) => )} */}
                    </div>
                </div>
            </div>
        </>
    );
}
