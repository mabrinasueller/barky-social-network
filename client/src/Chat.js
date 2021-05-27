import { useEffect, useRef } from "react";
import { socket } from "./Socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);
    const elemRef = useRef();

    useEffect(() => {
        console.log("mounted");

        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    });

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("user is typing: ", e.target.value);
            socket.emit("chatMessage", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <>
            <h1>Chat Room</h1>
            <div className="profile">
                <div className="chat-message-container" ref={elemRef}>
                    {chatMessages &&
                        chatMessages.map((message, index) => {
                            const {
                                first_name,
                                last_name,
                                img_url,
                                created_at,
                                id,
                            } = message;
                            return (
                                <>
                                    <div className="single-chat-container">
                                        <div className="chat-image-container">
                                            <Link to={`/user/${id}`}>
                                                <img
                                                    src={img_url}
                                                    alt={`${first_name} ${last_name}`}
                                                    className="chat-image"
                                                />
                                            </Link>
                                        </div>

                                        <div className="chat-user-container">
                                            <div className="chat-text-container">
                                                <p>
                                                    {" "}
                                                    {first_name} {last_name}{" "}
                                                    <span className="created-at">
                                                        {created_at}
                                                    </span>
                                                </p>

                                                <p key={index}>
                                                    {message.message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                </div>
                <textarea
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message here"
                    className="chat-textarea"
                ></textarea>
            </div>
        </>
    );
}
//logic for getting chat to always be scrolled down to newest message
// console.log("elemRef.current.scrollTop: ", elemRef.current.scrollTop);
// console.log(
//     "elemRef.current.clientHeight: ",
//     elemRef.current.clientHeight
// );
// console.log(
//     "elemRef.current.scrollHeight: ",
//     elemRef.current.scrollHeight
// );
