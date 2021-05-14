import { Component } from "react";
import Uploader from "./Uploader";
import axios from "./axios";
import ProfilePic from "./ProfilePic";
import Profile from "./Profile";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./OtherProfile";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.updateProfilePic = this.updateProfilePic.bind(this);
        this.setBio = this.setBio.bind(this);
    }
    async componentDidMount() {
        try {
            const { data } = await axios.get("/user");
            this.setState({
                firstName: data.first_name,
                lastName: data.last_name,
                imgUrl: data.img_url,
                bio: data.bio,
            });
        } catch (error) {
            console.log("error: ", error);
        }
    }

    toggleUploader() {
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }

    updateProfilePic(imgUrl) {
        this.setState({
            imgUrl,
        });
        this.toggleUploader();
    }

    setBio(newBio) {
        this.setState({
            bio: newBio,
        });
    }

    render() {
        return (
            <div>
                <header>
                    <img className="logo" src="../logo2.png" />

                    <ProfilePic
                        id={this.state.id}
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        imgUrl={this.state.imgUrl || "default_user.jpeg"}
                    />
                    <a href="/logout" className="logout">
                        Logout
                    </a>
                </header>
                <BrowserRouter>
                    <div className="main-container">
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    firstName={this.state.firstName}
                                    lastName={this.state.lastName}
                                    imgUrl={
                                        this.state.imgUrl || "default_user.jpeg"
                                    }
                                    bio={this.state.bio}
                                    setBio={this.setBio}
                                    toggleUploader={this.toggleUploader}
                                />
                            )}
                        />
                        <Route
                            path="/user/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                    </div>
                </BrowserRouter>
                {this.state.uploaderIsVisible && (
                    <Uploader
                        updateProfilePic={this.updateProfilePic}
                        toggleUploader={this.toggleUploader}
                    />
                )}
            </div>
        );
    }
}

//   <div className="main-container">
//                     <Profile
//                         firstName={this.state.firstName}
//                         lastName={this.state.lastName}
//                         imgUrl={this.state.imgUrl || "default_user.jpeg"}
//                         bio={this.state.bio}
//                         setBio={this.setBio}
//                         toggleUploader={this.toggleUploader}
//                     />

//                     {this.state.uploaderIsVisible && (
//                         <Uploader
//                             updateProfilePic={this.updateProfilePic}
//                             toggleUploader={this.toggleUploader}
//                         />
//                     )}
//                 </div>
//             </div>
