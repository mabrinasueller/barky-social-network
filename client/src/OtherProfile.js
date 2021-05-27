import axios from "./axios";
import FriendButton from "./FriendButton";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// const dispatch = useDispatch();
// const otherProfile = useSelector((state) => state.user);
// import { useDispatch, useSelector } from "react-redux";

export default function OtherProfile(props) {
    const history = useHistory();
    const [otherUser, setOtherUser] = useState();
    const { id } = props.match.params;

    console.log("props: ", props);

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

    if (otherUser) {
        return (
            <>
                <button onClick={() => history.goBack()}>Go back</button>
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
                        <div className="profile-text-container">
                            <h4>About us</h4>
                            <p>
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
                            </p>
                            <h4>Favorite song:</h4>
                            <p>Who let the dogs out?</p>
                            <h4>We are looking for:</h4>
                            <p>
                                a cool dog owner with another female dog to
                                cruise the parks of Berlin
                            </p>
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
                                    human&apos;s bed
                                </p>
                                <div className="spacer"></div>
                                <h4>I don&apos;t like:</h4>
                                <p>
                                    the vacuum, I definitely feel a sinister
                                    vibe coming from it!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return null;
    }
}
