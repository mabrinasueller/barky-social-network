export default function ProfilePic({
    firstName,
    lastName,
    imgUrl,
    toggleUploader,
}) {
    return (
        <div>
            <img
                className="profile-picture-small"
                alt={`${firstName} ${lastName}`}
                onClick={toggleUploader}
                src={imgUrl}
            />
        </div>
    );
}
