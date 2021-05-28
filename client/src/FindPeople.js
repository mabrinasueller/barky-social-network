import { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [users, setUsers] = useState("");
    const [inputField, setInputField] = useState();

    useEffect(() => {
        let ignore = false;
        (async () => {
            try {
                if (!inputField) {
                    const { data } = await axios.get("/find/users");
                    if (!ignore) {
                        setUsers(data);
                    }
                } else {
                    const { data } = await axios.post("/find/users", {
                        inputField: inputField,
                    });
                    if (!ignore) {
                        setUsers(data);
                    }
                }
            } catch (error) {
                console.log("error: ", error);
            }
        })();
        return () => {
            ignore = true;
        };
    }, [inputField]);

    const onChange = ({ target }) => {
        setInputField(target.value);
    };

    return (
        <div>
            <div className="content">
                <div className="profile-search">
                    <div className="search-text-container">
                        <h2>Find People</h2>
                        <input onChange={onChange} className="form-input" />
                        <p>Search results for {inputField}</p>
                    </div>
                    <ul>
                        <div className="profile-search-output">
                            {users &&
                                users.map((user, index) => {
                                    const {
                                        id,
                                        first_name,
                                        last_name,
                                        img_url,
                                    } = user;

                                    return (
                                        <div
                                            className="other-profile-top"
                                            key={index}
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
                                                    </div>
                                                    <div className="user-info-container">
                                                        <p>
                                                            {first_name}{" "}
                                                            {last_name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
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
