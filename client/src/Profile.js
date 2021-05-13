import ProfilePic from "./ProfilePic";
import BioEditor from "./Bio";

export default function Profile(props) {
    console.log("Props in Profile: ", props);
    return (
        <div className="content">
            <div className="profile-container">
                <div className="profile-picture-container">
                    <img
                        className="profile-picture-small"
                        firstName={props.firstName}
                        lastName={props.lastName}
                        src={props.imgUrl}
                    />
                </div>

                <div className="user-info-container">
                    <h2>
                        {props.firstName} {props.lastName}
                    </h2>
                    <h3>{props.bio}</h3>
                    <BioEditor bio={props.bio} setBio={props.setBio} />
                </div>
            </div>
        </div>
    );
}
