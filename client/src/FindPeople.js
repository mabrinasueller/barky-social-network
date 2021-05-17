import { useState, useEffect } from "react";
import axios from "./axios";

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
        <>
            <h2>Find People</h2>

            <input onChange={onChange} />
            <p>Search results for: {inputField}</p>

            <ul>
                {users &&
                    users.map((user, index) => {
                        return (
                            <div key={index}>
                                <img
                                    src={user.img_url || "default_user.jpeg"}
                                />

                                <p key={user.first_name}>
                                    {user.first_name} {user.last_name}
                                </p>
                            </div>
                        );
                    })}
            </ul>
        </>
    );
}
