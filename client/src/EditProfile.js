import { useEffect, useState } from "react";
import axios from "./axios";

export default function EditProfile() {
    const [profile, setProfile] = useState([]);
    const [updatedProfile, setUpdatedProfile] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("/user");
                console.log("data from editUser: ", data);
                setProfile(data);
            } catch (error) {
                console.log("Error in edit Profile: ", error);
            }
        })();
    }, []);

    return (
        <>
            <h1>Test for Edit</h1>
            <div className="profile">
                <div className="profile-text-container">
                    <div key={profile.id}>
                        <input
                            name="firstName"
                            value={profile.first_name}
                            type="text"
                        ></input>
                        <input
                            name="lastName"
                            value={profile.last_name}
                            type="text"
                        ></input>
                        <input
                            name="email"
                            value={profile.email}
                            type="email"
                        ></input>
                        <input name={profile.password} type="password"></input>
                    </div>
                </div>
            </div>
        </>
    );
}
