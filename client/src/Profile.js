import ProfilePic from "./ProfilePic";
import BioEditor from "./Bio";
import FriendButton from "./FriendButton";

export default function Profile(props) {
    console.log("Props in Profile: ", props);
    return (
        <div className="content">
            <div className="profile">
                <div className="profile-top">
                    <div className="profile-picture">
                        <div>
                            <img
                                alt={`${props.firstName} ${props.lastName}`}
                                src={props.imgUrl}
                                onClick={props.toggleUploader}
                                className="h-21 rounded-xl "
                            />
                        </div>
                    </div>

                    <div className="user-info-container">
                        <h2>
                            {props.firstName} {props.lastName}
                        </h2>
                        <h3>{props.bio}</h3>
                        <BioEditor bio={props.bio} setBio={props.setBio} />
                        <FriendButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
