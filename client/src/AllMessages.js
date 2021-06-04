import axios from "./axios";
import { useState, useEffect, elemRef } from "react";

export default function Messages({ activeUser }) {
    const [allMessages, setAllMessages] = useState([]);
    const [privateMsg, setPrivateMsg] = useState([]);
    const [singleThreads, setSingleThreads] = useState([]);
    const [selectedRecipient, setSelectedRecipient] = useState();

    useEffect(() => {
        getAllMessages();
    }, []);

    function getAllMessages() {
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
    }

    const lastMessagesByUser = [];

    for (let i = 0; i < allMessages.length; i++) {
        // console.log(arr[i].recipient_id);
        if (
            !lastMessagesByUser.find((elem) =>
                [elem.recipient_id, elem.sender_id].includes(
                    allMessages[i].recipient_id
                )
            )
        ) {
            lastMessagesByUser.push(allMessages[i]);
        }
    }

    const singleThreadMessages = (otherUserId, messages) => {
        const arr = [];
        for (let msg of messages) {
            if ([msg.recipient_id, msg.sender_id].includes(otherUserId)) {
                arr.push(msg);
            }
        }

        setSingleThreads(arr);
    };
    console.log("singleThreads: ", singleThreads);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/message", {
                viewedUser: selectedRecipient,
                privateMsg,
            });

            setSelectedRecipient(undefined);
            getAllMessages();

            console.log("data from sent message: ", data);
        } catch (error) {
            console.log("Error in sending message: ", error);
        }
    };

    return (
        <>
            <div className="chat-content">
                <div className="chat-profile-container">
                    <div className="chat-message-container-new">
                        <h3 className="all-messages-text">All messages </h3>{" "}
                        <p className="click-ind-messages">
                            (click on message to get individual messages)
                        </p>
                        {lastMessagesByUser?.map((message) => {
                            const {
                                first_name,
                                last_name,
                                img_url,
                                created_at,
                                id,
                                sender_id,
                                recipient_id,
                            } = message;
                            let date = new Date(created_at).toLocaleString(
                                "de-DE",
                                {
                                    timeZone: "Europe/Berlin",
                                }
                            );

                            return (
                                <div
                                    className="single-message-container"
                                    key={id}
                                    onClick={() => {
                                        const otherUserId = [
                                            sender_id,
                                            recipient_id,
                                        ].find((i) => i !== activeUser.id);

                                        setSelectedRecipient(otherUserId);
                                        singleThreadMessages(
                                            otherUserId,
                                            allMessages
                                        );
                                    }}
                                >
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
                                                    {first_name} {last_name}{" "}
                                                    <span className="created-at">
                                                        on {date}
                                                    </span>
                                                </p>
                                            </div>
                                            <p className="message-bold">
                                                {message.private_text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* <div className="profile-text-container">
                        <h3 className="all-messages-text">Single messages</h3> */}
                    <div className="click-container">
                        {selectedRecipient && (
                            <div className="chat-message-container-new">
                                {singleThreads?.map((message) => {
                                    const messageSent =
                                        message.sender_id === activeUser.id;
                                    const { created_at, id } = message;

                                    const {
                                        first_name,
                                        last_name,
                                        img_url,
                                    } = messageSent ? activeUser : message;
                                    let date = new Date(
                                        created_at
                                    ).toLocaleString("de-DE", {
                                        timeZone: "Europe/Berlin",
                                    });

                                    return (
                                        <div
                                            className={
                                                "single-message-container " &&
                                                messageSent
                                                    ? "sent"
                                                    : "received"
                                            }
                                            key={"a" + id}
                                        >
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
                                                            {first_name}{" "}
                                                            {last_name}{" "}
                                                            <span className="created-at">
                                                                on {date}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <p className="message-bold">
                                                        {message.private_text}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {selectedRecipient && (
                            <div className="chat-message-container-new">
                                <div className="answer-message">
                                    <textarea
                                        placeholder="Type your message here"
                                        onChange={(e) =>
                                            setPrivateMsg(e.target.value)
                                        }
                                    ></textarea>
                                    <div className="breaker"></div>
                                    <button
                                        onClick={(e) => {
                                            handleSubmit(e);
                                        }}
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

//   <div className="answer-message">
//       <textarea
//           placeholder="Type your message here"
//           onChange={(e) => setPrivateMsg(e.target.value)}
//       ></textarea>
//       <button
//           onClick={(e) => {
//               singleThreadMessages(otherUserId);
//               handleSubmit(e);
//           }}
//       >
//           Send
//       </button>
//   </div>;
