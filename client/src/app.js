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
import About from "./About";
import DarkMode from "./DarkMode";
import EditProfile from "./EditProfile";
import Messages from "./AllMessages";

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

    // toggleUploader(imgToChange)
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
                                    src="../logo.svg"
                                    alt="logo"
                                />
                            </Link>
                        </div>
                        <div className="profile-small-container">
                            <DarkMode />
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
                    <Route path="/delete/account" component={DeleteUser} />
                    <Route path="/about" component={About} />
                    <Route path="/edit" component={EditProfile} />
                    <Route
                        path="/messages"
                        render={() => (
                            <Messages
                                activeUser={{
                                    id: this.state.id,
                                    first_name: this.state.firstName,
                                    last_name: this.state.lastName,
                                    img_url:
                                        this.state.imgUrl ||
                                        "default_user.jpeg",
                                }}
                            />
                        )}
                    />
                    <footer className="footer">
                        © Barky - Keeping dogs busy since 2021
                    </footer>
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
