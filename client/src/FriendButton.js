import { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ id }) {
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/connections/${id}`);
                setButtonText(data.btnText);
            } catch (error) {
                console.log("error in friends-route: ", error);
            }
        })();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/connections", {
                btnText: buttonText,
                viewedUser: id,
            });
            setButtonText(data.btnText);
        } catch (error) {
            console.log("Error in Submit: ", error);
        }
    };

    const handleDecline = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/connections", {
                btnText: "Decline friend request",
                viewedUser: id,
            });
            setButtonText("Add as friend");
        } catch (error) {
            console.log("Error in Decline: ", error);
        }
    };

    return (
        <>
            <button
                className="border-4 border-black-200"
                onClick={handleSubmit}
            >
                {buttonText}
            </button>
            {buttonText === "Accept" && (
                <button onClick={handleDecline}>Decline</button>
            )}
        </>
    );
}
