import axios from "./axios";
import { useState, useEffect, elemRef } from "react";

export default function Messages() {
    const [allMessages, setAllMessages] = useState([]);
    const [singleThread, setSingleThread] = useState([]);
    const lastMessagesByUser = [];

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

    // console.log("allMessages: ", allMessages);
    // const filteredMessages = allMessages.forEach()

    return (
        <>
            <div className="profile-content">
                <div className="profile">
                    <div className="profile-text-container">
                        <h3>All messages</h3>
                        <div className="chat-message-container" ref={elemRef}>
                            {allMessages &&
                                allMessages.map((message) => {
                                    const {
                                        first_name,
                                        last_name,
                                        img_url,
                                        created_at,
                                        id,
                                    } = message;
                                    let date = new Date(created_at)
                                        .toUTCString()
                                        .replace("GMT", "");
                                    return (
                                        <div
                                            className="single-chat-container"
                                            key={id}
                                        >
                                            <div onClick={singleThreadMessages}>
                                                <div className="chat-image-container">
                                                    <img
                                                        src={img_url}
                                                        alt={`${first_name} ${last_name}`}
                                                        className="chat-image"
                                                    />
                                                </div>

                                                <div className="chat-user-container">
                                                    <div className="chat-text-container">
                                                        <div className="user-info-chat">
                                                            <p>
                                                                {" "}
                                                                {
                                                                    first_name
                                                                }{" "}
                                                                {last_name}{" "}
                                                                <span className="created-at">
                                                                    on {date}
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <p>{message.message}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
                {/* <div className="profile">
                    <div className="profile-text-container"> */}
                {/* {allMessages && allMessages.map((message) => )} */}
                {/* </div>
                </div> */}
            </div>
        </>
    );
}
