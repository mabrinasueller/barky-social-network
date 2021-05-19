import { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ id }) {
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/friends/${id}`);
                setButtonText(data.btnText);
            } catch (error) {
                console.log("error in friends-route: ", error);
            }
        })();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/friends", {
                btnText: buttonText,
                viewedUser: id,
            });
            setButtonText(data.btnText);
        } catch (error) {
            console.log("Error in Submit: ", error);
        }
    };

    return (
        <>
            <button
                className="border-4 border-black-200"
                type="submit"
                onClick={handleSubmit}
            >
                {buttonText}
            </button>
        </>
    );
}
