import { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    const [users, setUsers] = useState("");
    const [inputField, setInputField] = useState([]);

    useEffect(() => {
        console.log("useEffect just ran");
        (async () => {
            try {
                const response = await axios.get("/find/users");
                console.log("response: ", response);
                setUsers(response.data);
            } catch (error) {
                console.log("error: ", error);
            }
        })();
    }, []);

    const onChange = ({ target }) => {
        console.log("Input field ", target.value);
        setInputField(target.value);
    };

    return (
        <>
            <h2>Find People</h2>
            <p>Looking for someone special?</p>
            <input onChange={onChange} />
            <h4>These users just joined us recently:</h4>
            <ul>
                {users &&
                    users.map((user, index) => {
                        return (
                            <div key={index}>
                                <img src={user.img_url} />

                                <p key={user.first_name}>
                                    {user.first_name} {user.last_name}
                                </p>
                            </div>
                        );
                    })}
            </ul>
            <p>{inputField}</p>
        </>
    );
}
