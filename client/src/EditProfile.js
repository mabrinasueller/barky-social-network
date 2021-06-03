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
                setUpdatedProfile(data);
            } catch (error) {
                console.log("Error in edit Profile: ", error);
            }
        })();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit was clicked");
        try {
            const { data } = await axios.post("/edit", updatedProfile);
            console.log("data from editedUser: ", data);
            location.replace("/");
        } catch (error) {
            console.log("Error in updating user: ", error);
        }
    };

    return (
        <>
            <div className="padding">
                <div className="profile">
                    <div className="profile-edit-container">
                        <div key={profile.id}>
                            <input
                                name="firstName"
                                defaultValue={profile.first_name}
                                type="text"
                                className="form-input"
                                onChange={(e) =>
                                    setUpdatedProfile({
                                        ...updatedProfile,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            ></input>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                name="lastName"
                                defaultValue={profile.last_name}
                                type="text"
                                className="form-input"
                                onChange={(e) =>
                                    setUpdatedProfile({
                                        ...updatedProfile,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            ></input>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                name="email"
                                defaultValue={profile.email}
                                type="email"
                                className="form-input"
                                onChange={(e) =>
                                    setUpdatedProfile({
                                        ...updatedProfile,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            ></input>
                            <label htmlFor="email">Email</label>
                            <input
                                name={profile.password}
                                type="password"
                                className="form-input"
                                onChange={(e) =>
                                    setUpdatedProfile({
                                        ...updatedProfile,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            ></input>
                            <label htmlFor="password">Password</label>
                        </div>
                        <button onClick={handleSubmit}>Update profile</button>
                    </div>
                </div>
            </div>
        </>
    );
}
