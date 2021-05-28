import { Link } from "react-router-dom";
import axios from "./axios";

export default function deleteUser() {
    const handleConfirm = async () => {
        try {
            await axios.post("/delete");
            location.reload();
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
                            <div className="delete-text">
                                <h1>We&#39;ll miss you!</h1>

                                <div className="spacer"></div>
                            </div>
                            <div className="delete-info-text">
                                <h3>
                                    Saying Good-Bye isn&#39;t easy, but we are
                                    more than happy to welcome you back one day.
                                </h3>
                                <p>
                                    By clicking &quot;Delete my account&quot;,
                                    you confirm that you want to delete all your
                                    personal and profile information and images
                                    from <strong>Barky</strong>.{" "}
                                </p>
                            </div>
                            <div className="delete-request-buttons">
                                <div className="delete-button">
                                    <button onClick={handleConfirm}>
                                        Delete my account
                                    </button>
                                </div>
                                <Link to="/">
                                    <button>Cancel</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="logo-container">
                        <div className="goodbye-container">
                            <div className="goodbye-message">
                                <img
                                    src="../dancingHand.gif"
                                    alt="gif of a dancing hand waving goodbye"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
