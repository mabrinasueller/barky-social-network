import { Component } from "react";
import Uploader from "./Uploader";
import axios from "./axios";
import ProfilePic from "./ProfilePic";
import Profile from "./Profile";
import { BrowserRouter, Route, Link } from "react-router-dom";
import OtherProfile from "./OtherProfile";
import FindPeople from "./FindPeople";
import Friends from "./Friends";
import Menu from "./Menu";
import Chat from "./Chat";
import DeleteUser from "./DeleteUser";
// import DarkMode from "./DarkMode";

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
                            <Link to="/">
                                <img
                                    className="logo-small"
                                    src="../logo2.png"
                                    alt="logo"
                                />
                            </Link>
                        </div>
                        <div className="profile-small-container">
                            {/* <DarkMode /> */}
                            <ProfilePic
                                id={this.state.id}
                                firstName={this.state.firstName}
                                lastName={this.state.lastName}
                                imgUrl={
                                    this.state.imgUrl || "default_user.jpeg"
                                }
                                toggleUploader={this.toggleUploader}
                            />
                            <Menu />
                        </div>
                    </header>

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
                    <Route path="/users" component={FindPeople} />
                    <Route path="/friends" component={Friends} />
                    <Route path="/chat" component={Chat} />
                    <Route path="/delete-account" component={DeleteUser} />
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
