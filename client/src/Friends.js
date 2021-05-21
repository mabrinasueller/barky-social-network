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

    useEffect(() => {
        (!friends || !requests) && dispatch(getFriendsRequests());
    }, []);

    if (!friends || !requests) {
        return null;
    }

    return (
        <div className="content">
            <div className="friends-container">
                <ul>
                    <h2>You have {friends.length} friends</h2>
                    {friends &&
                        friends.map((user, index) => {
                            const { id, first_name, last_name, img_url } = user;
                            console.log(user);
                            return (
                                <>
                                    <div className="other-users-information center">
                                        <Link key={index} to={`/user/${id}`}>
                                            <div className="other-user-container">
                                                <img
                                                    key={img_url}
                                                    src={
                                                        img_url ||
                                                        "default_user.jpeg"
                                                    }
                                                    alt={`${first_name} ${last_name}`}
                                                />
                                                <p key={first_name}>
                                                    {first_name} {last_name}
                                                </p>
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
                                    </div>
                                </>
                            );
                        })}
                </ul>
            </div>
            <div className="request-container">
                <ul>
                    <h2>You have {requests.length} friend requests</h2>
                    {requests &&
                        requests.map((user, index) => {
                            const { id, first_name, last_name, img_url } = user;
                            console.log(user);
                            return (
                                <>
                                    <div className="other-users-information center">
                                        <Link key={index} to={`/user/${id}`}>
                                            <div>
                                                <img
                                                    key={img_url}
                                                    src={
                                                        img_url ||
                                                        "default_user.jpeg"
                                                    }
                                                    alt={`${first_name} ${last_name}`}
                                                />
                                                <p key={first_name}>
                                                    {first_name} {last_name}
                                                </p>
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
                                    </div>
                                </>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
}
