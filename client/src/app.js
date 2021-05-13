import { Component } from "react";
import Uploader from "./Uploader";
import axios from "./axios";
import ProfilePic from "./ProfilePic";
import Profile from "./Profile";

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
    componentDidMount() {
        axios
            .get("/user")
            .then(({ data }) => {
                this.setState({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    imgUrl: data.img_url,
                    bio: data.bio,
                });
            })
            .catch((error) => console.log("error: ", error));
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

    logout() {
        console.log("Logout was clicked");
        axios.get("/logout").then((response) => {
            console.log("response: ", response);
            window.location.reload(false);
        });
    }

    render() {
        return (
            <div>
                <header>
                    <div className="logo">
                        <img src="./logo.png" />
                    </div>
                    <a href="#" className="logout" onClick={this.logout}>
                        Logout
                    </a>
                </header>
                <div>
                    <div className="main-container">
                        <Profile
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            imgUrl={this.state.imgUrl || "default_user.jpeg"}
                            bio={this.state.bio}
                            setBio={this.setBio}
                        />
                        <ProfilePic
                            id={this.state.id}
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            imgUrl={this.state.imgUrl || "default_user.jpeg"}
                            toggleUploader={this.toggleUploader}
                        />

                        {this.state.uploaderIsVisible && (
                            <Uploader
                                updateProfilePic={this.updateProfilePic}
                                toggleUploader={this.toggleUploader}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
