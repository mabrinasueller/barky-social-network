import axios from "./axios";
import FriendButton from "./FriendButton";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Wallposts from "./Wallposts";
import { Link } from "react-router-dom";
import Messenger from "./Messenger";
import Maps from "./GoogleMaps";

export default function OtherProfile(props) {
    const history = useHistory();
    const [otherUser, setOtherUser] = useState();
    const [friends, setFriends] = useState();
    const [connection, setConnection] = useState();
    const [isShowing, setIsShowing] = useState(false);
    const { id } = props.match.params;

    console.log("props: ", props);

    function toggle() {
        setIsShowing(!isShowing);
    }

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/connection/${id}`);
                console.log("data from connection: ", data.success);
                setConnection(data.success);
            } catch (error) {
                console.log("error in connection: ", error);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/other-user/${id}`);
                setOtherUser({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    imgUrl: data.img_url,
                    bio: data.bio,
                });
            } catch (error) {
                console.log("error: ", error);
                props.history.push("/");
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/friends/others/${id}`);
                console.log("data from friends: ", data);
                setFriends(data);
            } catch (error) {
                console.log("Error in getting friends: ", error);
            }
        })();
    }, []);

    if (otherUser) {
        if (!connection) {
            return (
                <>
                    <button
                        className="back-button"
                        onClick={() => history.goBack()}
                    >
                        Go back
                    </button>
                    <div className="profile-content">
                        <div className="profile-top">
                            <div className="profile-picture">
                                <div className="profile-picture-container">
                                    <img
                                        src={otherUser.imgUrl}
                                        alt={`${otherUser.firstName} ${otherUser.lastName}`}
                                    />
                                </div>
                            </div>
                            <div className="user-info-container">
                                <h3>
                                    {otherUser.firstName} {otherUser.lastName}
                                </h3>
                                <p>{otherUser.bio}</p>
                                <FriendButton id={props.match.params.id} />
                            </div>
                        </div>
                        <div className="profile">
                            <div className="profile-text-container-not-friends">
                                <h1>Hold up!</h1>
                                <div className="spacer"></div>
                                <h2>
                                    Looks like you are not friends yet.
                                    <div className="spacer"></div>
                                    Become friends with {otherUser.firstName} to
                                    see the profile.
                                </h2>
                            </div>
                            <div className="profile-container-dog">
                                <div className="dog-profile-image-container">
                                    <img src="../Wauz4.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <button
                        className="back-button"
                        onClick={() => history.goBack()}
                    >
                        Go back
                    </button>
                    <div className="profile-content">
                        <div className="profile-top">
                            <div className="profile-picture">
                                <div className="profile-picture-container">
                                    <img
                                        src={otherUser.imgUrl}
                                        alt={`${otherUser.firstName} ${otherUser.lastName}`}
                                    />
                                </div>
                            </div>
                            <div className="user-info-container">
                                <h3>
                                    {otherUser.firstName} {otherUser.lastName}
                                </h3>
                                <p>{otherUser.bio}</p>
                                <FriendButton id={props.match.params.id} />
                                <div>
                                    <button onClick={toggle}>
                                        Send Message
                                    </button>
                                    <Messenger
                                        isShowing={isShowing}
                                        toggle={toggle}
                                        id={props.match.params.id}
                                    />
                                </div>
                            </div>

                            <div className="friends-profile-container">
                                <p>Friends of user:</p>
                                <div className="friends-small">
                                    {friends &&
                                        friends.map((friend) => {
                                            const {
                                                id,
                                                first_name,
                                                last_name,
                                                img_url,
                                            } = friend;
                                            return (
                                                <div key={id}>
                                                    <Link to={`/user/${id}`}>
                                                        <img
                                                            src={
                                                                img_url ||
                                                                "default_user.jpeg"
                                                            }
                                                            alt={`${first_name} ${last_name}`}
                                                            className="chat-image"
                                                        />
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>

                        <div className="profile">
                            <div className="profile-text-container">
                                <Wallposts id={props.match.params.id} />
                            </div>
                            <div className="profile-container-dog">
                                <div className="dog-image-container">
                                    <img src="../dog-default.jpeg" />
                                </div>
                                <div className="dog-info-container">
                                    <h2>Hi, I am Lola!</h2>
                                    <div className="spacer"></div>
                                    <p>Height: 24 inches</p>
                                    <div className="spacer"></div>
                                    <h4>I like:</h4>
                                    <p>
                                        long walks, puddles and sleeping on the
                                        humans bed
                                    </p>
                                    <div className="spacer"></div>
                                    <h4>I don&apos;t like:</h4>
                                    <p>
                                        the vacuum, I definitely feel a sinister
                                        vibe coming from it!
                                    </p>

                                    <h4>We are looking for:</h4>
                                    <p>
                                        a cool dog owner with another female dog
                                        to cruise the parks of Berlin
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-content">
                        <div className="profile-two">
                            <div className="spotify-player">
                                <h4>I really love this song right now ⬇ </h4>
                                <iframe
                                    src="https://open.spotify.com/embed/track/5BQHyj5Pb3dUY8W6TSjeTF"
                                    width="300"
                                    height="380"
                                    frameBorder="0"
                                    allowtransparency="true"
                                    allow="encrypted-media"
                                ></iframe>
                            </div>

                            <Maps />
                            <div className="location-container">
                                <h4>
                                    These are a few of our
                                    <div className="breaker"></div>
                                    favorite places:
                                </h4>
                                <p>Mauerpark</p>
                                <p>Volkspark Friedrichshain</p>
                                <p>Teufelsberg</p>
                                <p>Tegeler See</p>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    } else {
        return null;
    }
}

{
    /* <p>
                                But I must explain to you how all this mistaken
                                idea of denouncing pleasure and praising pain
                                was born and I will give you a complete account
                                of the system, and expound the actual teachings
                                of the great explorer of the truth, the
                                master-builder of human happiness.
                            </p>
                            <div className="breaker"></div>
                            <p>
                                No one rejects, dislikes, or avoids pleasure
                                itself, because it is pleasure, but because
                                those who do not know how to pursue pleasure
                                rationally encounter consequences that are
                                extremely painful.{" "}
                            </p> */
}
