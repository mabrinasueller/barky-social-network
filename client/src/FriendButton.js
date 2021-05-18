import { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ id }) {
    console.log("Friendbutton testing");
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        console.log(id);
        (async () => {
            try {
                const { data } = await axios.get(`/friends/${id}`);
                console.log("data in Button: ", data);
                setButtonText(data.btnText);
            } catch (error) {
                console.log("error in friends-route: ", error);
            }
        })();
    }, []);

    const handleSubmit = async (e) => {
        console.log("Button clicked");
        e.preventDefault();
        try {
            const { data } = await axios.post("/friends", {
                btnText: buttonText,
                viewedUser: id,
            });
            console.log("data in Button2: ", data);
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
