import ProfilePic from "./ProfilePic";
import BioEditor from "./Bio";
import FriendButton from "./FriendButton";

export default function Profile(props) {
    console.log("Props in Profile: ", props);
    return (
        <div className="content">
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
                    <h4>About us</h4>
                    <p>
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
                    </p>
                </div>
                <div className="profile-container-dog"></div>
            </div>
        </div>
    );
}
