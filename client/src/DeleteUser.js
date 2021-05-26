import { Link } from "react-router-dom";
import axios from "./axios";

export default function deleteUser(userId) {
    console.log("Testy is besty");
    const handleConfirm = async () => {
        console.log("Delete button got clicked");
        try {
            await axios.get(`/delete/${userId}`);
        } catch (error) {
            console.log("Error in /delete-route: ", error);
        }
    };

    return (
        <>
            <div className="register-background-container">
                <div className="register-container-big">
                    <div className="registration-container">
                        <div className="registration-text-container">
                            <div className="registration-text">
                                <h1>Testy for Delete-user</h1>
                                <button onClick={handleConfirm}>
                                    Delete my account
                                </button>
                            </div>
                            <Link to="/">
                                <button>Cancel</button>
                            </Link>
                        </div>
                    </div>
                    <div className="logo-container">
                        <div className="goodbye-container">
                            <div className="goodbye-message">
                                <h1>See you soon</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
