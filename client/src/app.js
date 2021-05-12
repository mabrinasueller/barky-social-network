import { Component } from "react";
import Uploader from "./Uploader";
import axios from "./axios";
import ProfilePic from "./ProfilePic";
import Profile from "./Profile";
import BioEditor from "./Bio";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.updateProfilePic = this.updateProfilePic.bind(this);
        // this.setBio = this.setBio.bind(this);
    }
    componentDidMount() {
        axios
            .get("/user")
            .then(({ data }) => {
                this.setState({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    imgUrl: data.img_url,
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

    setBio() {}

    render() {
        return (
            <div>
                <header>
                    <img className="logo" src="./placeholder.gif" />
                </header>
                <div className="main-container">
                    <Profile
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        imgUrl={this.state.imgUrl || "default_user.jpeg"}
                        bio={this.state.bio}
                    />
                    <ProfilePic
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
        );
    }
}
