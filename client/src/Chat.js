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
    console.log("chatmessages: ", chatMessages);
    return (
        <div className="chat-content">
            <div className="chat-profile-container">
                <div className="chat-message-container" ref={elemRef}>
                    {chatMessages &&
                        chatMessages.map((message) => {
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
                                <div className="single-chat-container" key={id}>
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
                                            <div className="user-info-chat">
                                                <p>
                                                    {" "}
                                                    {first_name} {last_name}{" "}
                                                    <span className="created-at">
                                                        {date}
                                                    </span>
                                                </p>
                                            </div>
                                            <p>{message.message}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <textarea
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message here"
                    className="chat-textarea"
                ></textarea>
            </div>
            <div className="chat-text-rules-container">
                <div className="chat-profile-text-container"></div>
                <h3>
                    First Rule of Chat Club:
                    <div className="breaker"></div>
                    be the kind of person your dog thinks you are
                </h3>
                <span>
                    Out motto at <strong>Barky</strong> is: ADAB - All Dogs Are
                    Beautiful. <div className="spacer"></div>And because of that
                    we want to create an environment where you can chat about
                    your dog, your life and basically anything, as long as what
                    you&#39;re sharing isn&#39;t racist, sexist, homophobic, or
                    transphobic. Otherwise we will have to part ways and end
                    your membership at <strong>Barky</strong>.
                    <div className="spacer"></div>
                    With that being said: Let&#39;s chat and have a good time!
                </span>
                <div className="logo-small">
                    <img src="../logo.svg" className="remove-on-mobile" />
                </div>
            </div>
        </div>
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
