import BioEditor from "./Bio";
import Wallposts from "./Wallposts";
import Maps from "./GoogleMaps";
import { useEffect, useState } from "react";
import axios from "./axios";

export default function Profile(props) {
    // console.log("Props in Profile: ", props);
    const [textAreaIsShowing, setTextAreaIsShowing] = useState(false);
    const [dogName, setDogName] = useState();
    const [newDogName, setNewDogName] = useState();

    function toggleName() {
        setTextAreaIsShowing(!textAreaIsShowing);
    }

    useEffect(() => {
        getDogName();
    });

    function getDogName() {
        console.log("component did mount!");
        (async () => {
            try {
                const { data } = await axios.get("/dogname");
                console.log("data from connection: ", data.dog_name);
                setDogName(data.dog_name);
            } catch (error) {
                console.log("Error in connection: ", error);
            }
        })();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("newdogname", newDogName);
        try {
            const { data } = await axios.post("/new/dogname", {
                newDogName,
            });
            console.log("data to new dog name: ", data);
            // getDogName();
        } catch (error) {
            console.log("Error in sending new dog name: ", error);
        }
    };

    return (
        <>
            <div className="profile-content">
                <div className="profile-top">
                    <div className="profile-picture">
                        <div className="profile-picture-container">
                            <img
                                alt={`${props.firstName} ${props.lastName}`}
                                src={props.imgUrl}
                                onClick={props.toggleUploader}
                                className="profile-picture-big "
                            />
                        </div>
                    </div>
                    <div className="user-info-container">
                        <h2>
                            {props.firstName} {props.lastName}
                        </h2>
                        <h4>{props.bio}</h4>
                        <BioEditor bio={props.bio} setBio={props.setBio} />
                    </div>
                </div>

                <div className="profile">
                    <div className="profile-text-container">
                        <Wallposts />
                    </div>
                    <div className="profile-container-dog">
                        <div className="dog-image-container">
                            <img src="./dog-default.jpeg" />
                        </div>
                        <div className="dog-info-container">
                            <h2>Hi, I am {dogName}! </h2>
                            {!textAreaIsShowing && (
                                <button onClick={toggleName}>Edit Name</button>
                            )}
                            {textAreaIsShowing && (
                                <>
                                    <textarea
                                        onChange={(e) =>
                                            setNewDogName(e.target.value)
                                        }
                                        defaultValue={dogName}
                                    ></textarea>
                                    <div className="edit-buttons">
                                        <button
                                            type="submit"
                                            onClick={(e) => handleSubmit(e)}
                                        >
                                            Save
                                        </button>
                                        <button onClick={(e) => toggleName(e)}>
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            )}

                            <div className="spacer"></div>
                            <p>Height: 24 inches</p>
                            <div className="spacer"></div>
                            <h4>I like:</h4>
                            <p>
                                long walks, puddles and sleeping on the humans
                                bed
                            </p>
                            <div className="spacer"></div>
                            <h4>I don&apos;t like:</h4>
                            <p>
                                the vacuum cleaner, I definitely feel a sinister
                                vibe coming from it!
                            </p>
                            <h4>We are looking for:</h4>
                            <p>
                                a cool dog owner with another female dog to
                                cruise the parks of Berlin
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile-content">
                <div className="profile-two">
                    <div className="spotify-player">
                        <h4>I really love this song right now:</h4>
                        <iframe
                            src="https://open.spotify.com/embed/track/5BQHyj5Pb3dUY8W6TSjeTF"
                            width="300"
                            height="380"
                            frameBorder="0"
                            allowtransparency="true"
                            allow="encrypted-media"
                        ></iframe>
                    </div>

                    <Maps />
                    <div className="location-container">
                        <h4>
                            These are a few of our
                            <div className="breaker"></div>
                            favorite places:
                        </h4>
                        <p>Mauerpark</p>
                        <p>Volkspark Friedrichshain</p>
                        <p>Teufelsberg</p>
                        <p>Tegeler See</p>
                    </div>
                </div>
            </div>
        </>
    );
}
