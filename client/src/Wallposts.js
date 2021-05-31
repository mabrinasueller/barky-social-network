import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default function WallPosts({ id }) {
    const elemRef = useRef();
    const [newWallPost, setNewWallPost] = useState();
    const [allWallPosts, setAllWallPosts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/profile/wallposts/${id}`);
                console.log("data from getting all posts: ", data);
                setAllWallPosts(data);
            } catch (error) {
                console.log("error in allMessages: ", error);
            }
        })();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit was clicked!");
        try {
            const { data } = await axios.post("/wall/posts", {
                viewedUser: id,
                post: newWallPost,
            });
            console.log("data from sending post: ", data.post);
            let newWallPosts = [data, ...allWallPosts];
            setAllWallPosts(newWallPosts);
            setNewWallPost(data.post);
        } catch (error) {
            console.log("Error in sending post: ", error);
        }
    };

    const onChange = ({ target }) => {
        setNewWallPost(target.value);
        console.log("target.value", target.value);
    };

    return (
        <div className="chat-profile-container">
            <div className="chat-message-container" ref={elemRef}>
                {/* {allWallPosts &&
                    allWallPosts.map((post) => {
                        const {
                            first_name,
                            last_name,
                            img_url,
                            created_at,
                            id,
                        } = post;
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

                                        <p>{post.post}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })} */}
            </div>
            <textarea
                // onChange={(e) => setNewWallPost(e.target.value)}
                onChange={onChange}
                placeholder="Type your message here"
                className="chat-textarea"
            ></textarea>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

//   if (allWallPosts.length === 0){" "}
//                                         {
//                                             <p>
//                                                 No posts yet. Be the first to
//                                                 write a post!
//                                             </p>
//                                         } else{}
