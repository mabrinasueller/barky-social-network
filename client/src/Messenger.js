import { useState, useEffect } from "react";
import axios from "./axios";

export default function messenger({ id, isShowing, toggle }) {
    const [message, setMessage] = useState([]);

    const handleSubmit = async (e) => {
        console.log("submit got clicked");
        e.preventDefault();
        try {
            const { data } = await axios.post("/message", {
                viewedUser: id,
                message,
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

    const onChange = ({ target }) => {
        setMessage(target.value);
    };

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
                                // onChange={(e) => setMessage(e.target.value)}
                                onChange={onChange}
                            ></textarea>
                        </div>

                        <div className="modal-buttons">
                            <button onClick={handleSubmit}>Send message</button>
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
