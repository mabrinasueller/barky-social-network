import ProfilePic from "./ProfilePic";

export default function Profile({ firstName, lastName, imgUrl }) {
    console.log("Props in Profile: ", firstName, lastName, imgUrl);
    return (
        <div>
            <h2>
                Good to see you, {firstName} {lastName}
            </h2>
            <ProfilePic
                className="profilepic-big"
                firstName={firstName}
                lastName={lastName}
                imgUrl={imgUrl}
            />
        </div>
    );
}
