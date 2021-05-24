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
            state.users && state.users.filter((user) => user.accepted === false)
    );

    // const sendRequests = useSelector(
    //     (state) =>
    //         state.user &&
    //         state.users.filter(
    //             (user) => user.accepted === false && user.id != id
    //         )
    // );

    useEffect(() => {
        (!friends || !requests) && dispatch(getFriendsRequests());
    }, []);

    if (!friends || !requests) {
        return null;
    }

    return (
        <div className="content">
            <div className="profile-search">
                <div className="friends-container">
                    <ul>
                        <h2>You have {friends.length} friends</h2>
                        <div className="profile-search-output">
                            {friends &&
                                friends.map((user, index) => {
                                    const {
                                        id,
                                        first_name,
                                        last_name,
                                        img_url,
                                    } = user;
                                    console.log(user);
                                    return (
                                        <>
                                            <div className="other-profile-top">
                                                <Link
                                                    key={index}
                                                    to={`/user/${id}`}
                                                >
                                                    <div className="profile-picture">
                                                        <div className="profile-picture-container">
                                                            <img
                                                                key={img_url}
                                                                src={
                                                                    img_url ||
                                                                    "default_user.jpeg"
                                                                }
                                                                alt={`${first_name} ${last_name}`}
                                                            />
                                                            <p key={first_name}>
                                                                {first_name}{" "}
                                                                {last_name}
                                                            </p>
                                                            <div className="spacer"></div>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <button
                                                    key={unfriend}
                                                    onClick={() =>
                                                        dispatch(unfriend(id))
                                                    }
                                                >
                                                    Unfriend
                                                </button>
                                                <div className="spacer"></div>
                                            </div>
                                        </>
                                    );
                                })}
                        </div>
                    </ul>
                </div>
                <div className="request-container">
                    <ul>
                        <h2>You have {requests.length} friend requests</h2>
                        <div className="profile-search-output">
                            {requests &&
                                requests.map((user, index) => {
                                    const {
                                        id,
                                        first_name,
                                        last_name,
                                        img_url,
                                    } = user;
                                    console.log(user);
                                    return (
                                        <>
                                            <div className="other-profile-top">
                                                <Link
                                                    key={index}
                                                    to={`/user/${id}`}
                                                >
                                                    <div className="profile-picture">
                                                        <div className="profile-picture-container">
                                                            <img
                                                                key={img_url}
                                                                src={
                                                                    img_url ||
                                                                    "default_user.jpeg"
                                                                }
                                                                alt={`${first_name} ${last_name}`}
                                                            />
                                                            <p key={first_name}>
                                                                {first_name}{" "}
                                                                {last_name}
                                                            </p>
                                                            <div className="spacer"></div>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <button
                                                    key={addFriend}
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
                                        </>
                                    );
                                })}
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
}
