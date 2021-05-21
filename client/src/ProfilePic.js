export default function ProfilePic({
    firstName,
    lastName,
    imgUrl,
    toggleUploader,
}) {
    return (
        <div>
            <img
                // className="h-14 w-14 rounded-lg border-4 border-white-400"
                className="profile-picture-small"
                alt={`${firstName} ${lastName}`}
                onClick={toggleUploader}
                src={imgUrl}
            />
        </div>
    );
}
