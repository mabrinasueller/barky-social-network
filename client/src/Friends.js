import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { render } from "react-dom/cjs/react-dom.production.min";
import { getFriendsRequests } from "./actions";
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
    console.log("testy is besty");

    useEffect(() => {
        (!friends || !requests) && dispatch(getFriendsRequests());
    }, []);

    // if (!friends || !requests) {
    //     return null;
    // }

    return (
        <div>
            <h1>Friends route working</h1>
            <ul>
                <h2>Your friends:</h2>
                {friends &&
                    friends.map((user, index) => {
                        const { id, first_name, last_name, img_url } = user;
                        console.log(user);
                        return (
                            <Link key={index} to={`/user/${id}`}>
                                <div>
                                    <img
                                        src={img_url || "default_user.jpeg"}
                                        alt={`${first_name} ${last_name}`}
                                    />
                                    <p key={first_name}>
                                        {first_name} {last_name}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
            </ul>
            <ul>
                <h2>These users want to be friends with you:</h2>
                {requests &&
                    requests.map((user, index) => {
                        const { id, first_name, last_name, img_url } = user;
                        console.log(user);
                        return (
                            <Link key={index} to={`/user/${id}`}>
                                <div>
                                    <img
                                        src={img_url || "default_user.jpeg"}
                                        alt={`${first_name} ${last_name}`}
                                    />
                                    <p key={first_name}>
                                        {first_name} {last_name}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
            </ul>
        </div>
    );
}
