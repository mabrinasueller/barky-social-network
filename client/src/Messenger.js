import { useState, useEffect } from "react";
import axios from "./axios";

export default function messenger({ id, isShowing, toggle }) {
    const [privateMsg, setPrivateMsg] = useState([]);

    const handleSubmit = async (e) => {
        console.log("submit got clicked");
        console.log("privateMsg: ", privateMsg);
        e.preventDefault();
        try {
            const { data } = await axios.post("/message", {
                viewedUser: id,
                privateMsg,
            });
            console.log("data from sent message: ", data);
        } catch (error) {
            console.log("Error in sending message: ", error);
        }
    };

    useEffect(() => {
        console.log("component did mount");
        console.log("isShowing: ", isShowing);
    }, [isShowing]);

    return (
        <>
            {isShowing && (
                <>
                    <div className="overlay" onClick={toggle}></div>
                    <div className="modal-container">
                        <div className="modal-text-container">
                            <h3>Send your message:</h3>
                            <textarea
                                placeholder="Type your message here"
                                onChange={(e) => setPrivateMsg(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="modal-buttons">
                            <button
                                onClick={(e) => {
                                    handleSubmit(e);
                                    toggle();
                                }}
                            >
                                Send message
                            </button>
                            <button href="#" onClick={toggle}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
