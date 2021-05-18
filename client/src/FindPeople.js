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
            <h2>Find People</h2>

            <input onChange={onChange} />
            <p>Search results for: {inputField}</p>

            <ul>
                {users &&
                    users.map((user, index) => {
                        const { id, first_name, last_name, img_url } = user;
                        console.log(user);

                        return (
                            <Link key={index} to={`/user/${id}`}>
                                <div className="flex flex:1 flex-row p-4">
                                    <div className="flex border-4 border-white-800">
                                        <img
                                            src={img_url || "default_user.jpeg"}
                                            alt={`${first_name} ${last_name}`}
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center pl-4 text-xl">
                                        <p key={first_name}>
                                            {first_name} {last_name}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
            </ul>
        </div>
    );
}
