import { Component } from "react";
import Uploader from "./Uploader";
import axios from "./axios";
import ProfilePic from "./ProfilePic";
import Profile from "./Profile";
import { BrowserRouter, Route, Link } from "react-router-dom";
import OtherProfile from "./OtherProfile";
import FindPeople from "./FindPeople";
import Friends from "./Friends";

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
                id: data.id,
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
                <BrowserRouter>
                    <header>
                        <div className="logo-header-container">
                            <img
                                className="logo-small"
                                src="../logo2.png"
                                alt="logout-button"
                            />
                        </div>
                        <div className="navbar-container">
                            <Link to="/">Profile</Link>
                            <Link to="/users">Find Users</Link>
                            <Link to="/friends">Friends</Link>
                            {/* <a href="/logout" className="logout">
                                Logout
                            </a> */}
                        </div>
                        <div className="profile-small-container">
                            <a href="/logout">
                                <img src="../logout.png" className="logout" />
                            </a>
                            <ProfilePic
                                id={this.state.id}
                                firstName={this.state.firstName}
                                lastName={this.state.lastName}
                                imgUrl={
                                    this.state.imgUrl || "default_user.jpeg"
                                }
                                toggleUploader={this.toggleUploader}
                                className=""
                            />
                        </div>
                    </header>

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
                                    id={this.state.id}
                                    setBio={this.setBio}
                                    toggleUploader={this.toggleUploader}
                                    className="profile-picture-big"
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
                        <Route path="/users" render={() => <FindPeople />} />
                        <Route path="/friends" render={() => <Friends />} />
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
