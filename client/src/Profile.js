import BioEditor from "./Bio";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Profile(props) {
    console.log("Props in Profile: ", props);
    const elemRef = useRef();

    let chatMessages;

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("user is typing: ", e.target.value);

            e.target.value = "";
        }
    };

    return (
        <div className="profile-content">
            <div className="profile-top">
                <div className="profile-picture">
                    <div className="profile-picture-container">
                        <img
                            alt={`${props.firstName} ${props.lastName}`}
                            src={props.imgUrl}
                            onClick={props.toggleUploader}
                            className="profile-picture-big "
                        />
                    </div>
                </div>
                <div className="user-info-container">
                    <h2>
                        {props.firstName} {props.lastName}
                    </h2>
                    <h4>{props.bio}</h4>
                    <BioEditor bio={props.bio} setBio={props.setBio} />
                </div>
            </div>

            <div className="profile">
                <div className="profile-text-container">
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
                                        <div
                                            className="single-chat-container"
                                            key={id}
                                        >
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
                                                            {first_name}{" "}
                                                            {last_name}{" "}
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

                    {/* <p>
                        But I must explain to you how all this mistaken idea of
                        denouncing pleasure and praising pain was born and I
                        will give you a complete account of the system, and
                        expound the actual teachings of the great explorer of
                        the truth, the master-builder of human happiness.
                    </p>
                    <div className="breaker"></div>
                    <p>
                        No one rejects, dislikes, or avoids pleasure itself,
                        because it is pleasure, but because those who do not
                        know how to pursue pleasure rationally encounter
                        consequences that are extremely painful.{" "}
                    </p> */}
                    {/* <textarea></textarea>
                    <button>Send</button> */}
                </div>
                <div className="profile-container-dog">
                    <div className="dog-image-container">
                        <img src="./dog-default.jpeg" />
                    </div>
                    <div className="dog-info-container">
                        <h2>Hi, I am Lola!</h2>
                        <div className="spacer"></div>
                        <p>Height: 24 inches</p>
                        <div className="spacer"></div>
                        <h4>I like:</h4>
                        <p>
                            long walks, puddles and sleeping on the humans bed
                        </p>
                        <div className="spacer"></div>
                        <h4>I don&apos;t like:</h4>
                        <p>
                            the vacuum, I definitely feel a sinister vibe coming
                            from it!
                        </p>
                        <h4>Favorite song:</h4>
                        <p>Who let the dogs out?</p>
                        <h4>We are looking for:</h4>
                        <p>
                            a cool dog owner with another female dog to cruise
                            the parks of Berlin
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
