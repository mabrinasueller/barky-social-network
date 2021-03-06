// import BioEditor from "./Bio";
// import Wallposts from "./Wallposts";
// import Maps from "./GoogleMaps";
// import { useEffect, useState } from "react";
// import axios from "./axios";

// export default function Profile(props) {
//     // console.log("Props in Profile: ", props);
//     const [textAreaIsShowing, setTextAreaIsShowing] = useState(false);
//     const [dogName, setDogName] = useState();
//     const [newDogName, setNewDogName] = useState();
//     const [dogHeight, setDogHeight] = useState();
//     const [dogLike, setDogLike] = useState();
//     const [dogDislike, setDogDislike] = useState();
//     const [dogSearch, setDogSearch] = useState();

//     function toggleName() {
//         setTextAreaIsShowing(!textAreaIsShowing);
//     }

//     useEffect(() => {
//         getDogName();
//     }, []);

//     function getDogName() {
//         console.log("component did mount!");
//         (async () => {
//             try {
//                 const { data } = await axios.get("/dogname");
//                 setDogName(data.dog_name);
//             } catch (error) {
//                 console.log("Error in connection: ", error);
//             }
//         })();
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post("/new/dogname", {
//                 newDogName,
//             });
//             getDogName();
//             toggleName();
//         } catch (error) {
//             console.log("Error in sending new dog name: ", error);
//         }
//     };

//     return (
//         <>
//             <div className="profile-content">
//                 <div className="profile-top">
//                     <div className="profile-picture">
//                         <div className="profile-picture-container">
//                             <img
//                                 alt={`${props.firstName} ${props.lastName}`}
//                                 src={props.imgUrl}
//                                 onClick={props.toggleUploader}
//                                 className="profile-picture-big "
//                             />
//                         </div>
//                     </div>
//                     <div className="user-info-container">
//                         <h2>
//                             {props.firstName} {props.lastName}
//                         </h2>
//                         <h4>{props.bio}</h4>
//                         <BioEditor bio={props.bio} setBio={props.setBio} />
//                     </div>
//                 </div>

//                 <div className="profile">
//                     <div className="profile-text-container">
//                         <Wallposts />
//                     </div>
//                     <div className="profile-container-dog">
//                         <div className="dog-image-container">
//                             <img src="./dog-default.jpeg" />
//                         </div>
//                         <div className="dog-info-container">
//                             <h2>
//                                 Hi, I am&nbsp;
//                                 {!textAreaIsShowing && (
//                                     <>
//                                         {dogName}!&nbsp;
//                                         <button onClick={toggleName}>
//                                             Edit
//                                         </button>
//                                     </>
//                                 )}
//                             </h2>
//                             {textAreaIsShowing && (
//                                 <>
//                                     <textarea
//                                         onChange={(e) =>
//                                             setNewDogName(e.target.value)
//                                         }
//                                         defaultValue={dogName}
//                                     ></textarea>
//                                     <div className="edit-buttons">
//                                         <button
//                                             type="submit"
//                                             onClick={(e) => handleSubmit(e)}
//                                         >
//                                             Save
//                                         </button>
//                                         <button onClick={(e) => toggleName(e)}>
//                                             Cancel
//                                         </button>
//                                     </div>
//                                 </>
//                             )}

//                             <div className="spacer"></div>
//                             <p>
//                                 Height: 24 inches{" "}
//                                 <button onClick={toggleName}>Edit</button>
//                             </p>
//                             <div className="spacer"></div>
//                             <h4>I like:</h4>
//                             <p>
//                                 long walks, puddles and sleeping on the humans
//                                 bed
//                             </p>
//                             <div className="spacer"></div>
//                             <h4>I don&apos;t like:</h4>
//                             <p>
//                                 the vacuum cleaner, I definitely feel a sinister
//                                 vibe coming from it!
//                             </p>
//                             <h4>We are looking for:</h4>
//                             <p>
//                                 a cool dog owner with another female dog to
//                                 cruise the parks of Berlin
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="profile-content">
//                 <div className="profile-two">
//                     <div className="spotify-player">
//                         <h4>I really love this song right now:</h4>
//                         <iframe
//                             src="https://open.spotify.com/embed/track/5BQHyj5Pb3dUY8W6TSjeTF"
//                             width="300"
//                             height="380"
//                             frameBorder="0"
//                             allowtransparency="true"
//                             allow="encrypted-media"
//                         ></iframe>
//                     </div>

//                     <Maps />
//                     <div className="location-container">
//                         <h4>
//                             These are a few of our
//                             <div className="breaker"></div>
//                             favorite places:
//                         </h4>
//                         <p>Mauerpark</p>
//                         <p>Volkspark Friedrichshain</p>
//                         <p>Teufelsberg</p>
//                         <p>Tegeler See</p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

import BioEditor from "./Bio";
import Wallposts from "./Wallposts";
import Maps from "./GoogleMaps";
import { useEffect, useState } from "react";
import axios from "./axios";

export default function Profile(props) {
    // console.log("Props in Profile: ", props);
    const [textAreaIsShowing, setTextAreaIsShowing] = useState(false);
    const [dogUploaderIsShowing, setDogUploaderIsShowing] = useState(false);
    const [dogName, setDogName] = useState();
    const [newDogName, setNewDogName] = useState();
    const [dogHeight, setDogHeight] = useState();
    const [dogLike, setDogLike] = useState();
    const [dogDislike, setDogDislike] = useState();
    const [dogSearch, setDogSearch] = useState();
    const [dogPhoto, setDogPhoto] = useState();

    function toggleTextarea() {
        setTextAreaIsShowing(!textAreaIsShowing);
    }

    function toggleDogUploader() {
        setDogUploaderIsShowing(!dogUploaderIsShowing);
    }

    useEffect(() => {
        getDogName();
    }, []);

    function getDogName() {
        console.log("component did mount!");
        (async () => {
            try {
                const { data } = await axios.get("/dogname");
                setDogName(data.dog_name);
            } catch (error) {
                console.log("Error in connection: ", error);
            }
        })();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/new/dogname", {
                newDogName,
            });
            getDogName();
            toggleTextarea();
        } catch (error) {
            console.log("Error in sending new dog name: ", error);
        }
    };

    const handlePhotoSubmit = async (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", file);
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
                            <img
                                src="./dog-default.jpeg"
                                onClick={toggleDogUploader}
                            />
                            {dogUploaderIsShowing && (
                                <>
                                    <div
                                        className="overlay"
                                        onClick={toggleDogUploader}
                                    ></div>
                                    <div className="modal-container">
                                        <div className="modal-text-container">
                                            <h3>Update your profile picture</h3>
                                            <input
                                                type="file"
                                                name="file"
                                                className="inputfile"
                                                onChange={(e) =>
                                                    setDogPhoto(
                                                        e.target.files[0]
                                                    )
                                                }
                                            ></input>
                                        </div>

                                        <div className="modal-buttons">
                                            <button
                                                onClick={(e) => {
                                                    handlePhotoSubmit(e);
                                                    toggleDogUploader();
                                                }}
                                            >
                                                Update photo
                                            </button>
                                            <button
                                                href="#"
                                                onClick={toggleDogUploader}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="dog-info-container">
                            <h2>
                                Hi, I am&nbsp;
                                {!textAreaIsShowing && (
                                    <>
                                        {dogName}!&nbsp;
                                        <button onClick={toggleTextarea}>
                                            Edit
                                        </button>
                                    </>
                                )}
                            </h2>
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
                                        <button
                                            onClick={(e) => toggleTextarea(e)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            )}

                            <div className="spacer"></div>
                            <p>
                                Height: 24 inches{" "}
                                <button onClick={toggleTextarea}>Edit</button>
                            </p>
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
