import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfilePosts } from "./actions";
import { Link } from "react-router-dom";
import axios from "./axios";

export default function WallPosts() {
    const elemRef = useRef();
    const dispatch = useDispatch();
    const [sendWallPosts, setSendWallPosts] = useState();
    const wallPosts = useSelector((state) => state && state.wallPosts);

    let chatMessages;

    async function setWallPosts(id) {
        const { data } = await axios.post("/wallposts", {
            post: sendWallPosts,
            viewedUser: id,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("user is typing: ", e.target.value);

        e.target.value = "";
        setWallPosts();
    };

    useEffect(() => {
        setWallPosts();
    }, []);

    useEffect(() => {
        console.log("Profile mounted");
        !wallPosts && dispatch(getProfilePosts());
    }, []);

    return (
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
                onChange={(e) => setSendWallPosts(e.target.value)}
                placeholder="Type your message here"
                className="chat-textarea"
            ></textarea>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
