import ProfilePic from "./ProfilePic";
import BioEditor from "./Bio";

export default function Profile(props) {
    console.log("Props in Profile: ", props);
    return (
        <div className="content">
            <div className="profile-container">
                <div className="profile-picture-container">
                    {/* <ProfilePic
                        firstName={props.firstName}
                        lastName={props.lastName}
                        imgUrl={props.imgUrl}
                        toggleUploader={props.toggleUploader}
                    /> */}
                    {/* <img
                        src={props.imgUrl}
                        className="profile-picture-big"
                        toggleUploader={props.toggleUploader}
                    /> */}
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
