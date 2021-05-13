export default function ProfilePic({
    firstName,
    lastName,
    imgUrl,
    toggleUploader,
}) {
    console.log("props in Xmpl:", firstName, lastName, imgUrl, toggleUploader);
    return (
        <div>
            <img
                className="profile-picture-big"
                alt={`${firstName} ${lastName}`}
                onClick={toggleUploader}
                src={imgUrl}
            />
        </div>
    );
}
