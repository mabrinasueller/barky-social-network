import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFriendsRequests, addFriend, unfriend } from "./actions";
import { Link } from "react-router-dom";

export default function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector(
        (state) => state.users && state.users.filter((user) => user.accepted)
    );

    const requests = useSelector(
        (state) =>
            state.users &&
            state.users.filter(
                (user) => user.accepted === false && user.wannabe
            )
    );

    const sentRequests = useSelector(
        (state) =>
            state.users &&
            state.users.filter(
                (user) => user.wannabe === false && user.accepted === false
            )
    );

    useEffect(() => {
        (!friends || !requests || !sentRequests) &&
            dispatch(getFriendsRequests());
    }, []);

    if (!friends || !requests) {
        return null;
    }

    return (
        <div className="content">
            <div className="profile-search">
                <div className="friends-container">
                    <ul>
                        <h2>You have {friends.length} friend(s)</h2>
                        <div className="profile-search-output">
                            {friends &&
                                friends.map((user) => {
                                    const {
                                        id,
                                        first_name,
                                        last_name,
                                        img_url,
                                    } = user;
                                    console.log(user);
                                    return (
                                        <div
                                            className="other-profile-top"
                                            key={id}
                                        >
                                            <Link to={`/user/${id}`}>
                                                <div className="profile-picture">
                                                    <div className="profile-picture-container">
                                                        <img
                                                            src={
                                                                img_url ||
                                                                "default_user.jpeg"
                                                            }
                                                            alt={`${first_name} ${last_name}`}
                                                        />
                                                        <p>
                                                            {first_name}{" "}
                                                            {last_name}
                                                        </p>
                                                        <div className="spacer"></div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    dispatch(unfriend(id))
                                                }
                                            >
                                                Unfriend
                                            </button>
                                            <div className="spacer"></div>
                                        </div>
                                    );
                                })}
                        </div>
                    </ul>
                </div>
                <div className="request-container">
                    <ul>
                        <h2>You have {requests.length} friend request(s)</h2>
                        <div className="profile-search-output">
                            {requests &&
                                requests.map((user) => {
                                    const {
                                        id,
                                        first_name,
                                        last_name,
                                        img_url,
                                    } = user;
                                    console.log(user);
                                    return (
                                        <div
                                            className="other-profile-top"
                                            key={id}
                                        >
                                            <Link to={`/user/${id}`}>
                                                <div className="profile-picture">
                                                    <div className="profile-picture-container">
                                                        <img
                                                            src={
                                                                img_url ||
                                                                "default_user.jpeg"
                                                            }
                                                            alt={`${first_name} ${last_name}`}
                                                        />
                                                        <p>
                                                            {first_name}{" "}
                                                            {last_name}
                                                        </p>
                                                        <div className="spacer"></div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    dispatch(addFriend(id))
                                                }
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() =>
                                                    dispatch(unfriend(id))
                                                }
                                            >
                                                Decline friend request
                                            </button>
                                            <div className="spacer"></div>
                                        </div>
                                    );
                                })}
                        </div>
                    </ul>
                </div>
                <div className="request-container">
                    <ul>
                        <h2>
                            You have {sentRequests.length} pending friend
                            request(s)
                        </h2>
                        <div className="profile-search-output">
                            {sentRequests &&
                                sentRequests.map((user) => {
                                    const {
                                        id,
                                        first_name,
                                        last_name,
                                        img_url,
                                    } = user;
                                    console.log(user);
                                    return (
                                        <div
                                            className="other-profile-top"
                                            key={id}
                                        >
                                            <Link to={`/user/${id}`}>
                                                <div className="profile-picture">
                                                    <div className="profile-picture-container">
                                                        <img
                                                            src={
                                                                img_url ||
                                                                "default_user.jpeg"
                                                            }
                                                            alt={`${first_name} ${last_name}`}
                                                        />
                                                        <p>
                                                            {first_name}{" "}
                                                            {last_name}
                                                        </p>
                                                        <div className="spacer"></div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    dispatch(unfriend(id))
                                                }
                                            >
                                                Cancel friend request
                                            </button>
                                            <div className="spacer"></div>
                                        </div>
                                    );
                                })}
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
}
