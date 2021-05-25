import { useEffect, useRef } from "react";
import { socket } from "./Socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);
    console.log("chat: ", chatMessages);
    const elemRef = useRef();

    useEffect(() => {
        console.log("mounted");

        console.log("elemRef.current.scrollTop: ", elemRef.current.scrollTop);
        console.log(
            "elemRef.current.clientHeight: ",
            elemRef.current.clientHeight
        );
        console.log(
            "elemRef.current.scrollHeight: ",
            elemRef.current.scrollHeight
        );

        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    });

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("user is typing: ", e.target.value);
            socket.emit("chatMessages", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <>
            <h1>Chat Room</h1>
            <div className="chat-message-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map((message, index) => {
                        return (
                            <>
                                <p key={index}>{message.message}</p>
                            </>
                        );
                    })}
                <textarea
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message here"
                ></textarea>
            </div>
        </>
    );
}
