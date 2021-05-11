import React, { Component } from "react";
import Uploader from "./Uploader";
import axios from "./axios";
import ProfilePic from "./ProfilePic";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.updateProfilePic = this.updateProfilePic.bind(this);
    }
    componentDidMount() {
        console.log("App just mounted");
        axios.get("/user").then(({ data }) => {
            console.log(data.last_name);
            this.setState({
                firstName: data.first_name,
                lastName: data.last_name,
                imgUrl: data.img_url,
            });
        });
    }

    toggleUploader() {
        this.setState({ uploaderIsVisible: !this.state.uploaderVisible });
    }

    methodInApp(arg) {
        console.log("argument methodInApp got passed: ", arg);
    }

    handleSubmit(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", this.state.file);
        axios
            .post("/upload", formData)
            .then(({ data }) => {
                this.props.updateProfilePic(data.img_url);
            })
            .catch((err) => {
                console.log("err ", err);
            });
    }

    render() {
        return (
            <div>
                <header>
                    <img className="logo" src="./placeholder.gif" />
                    <h1>Bonjour</h1>
                </header>
                <div className="main-container">
                    <ProfilePic
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        imgUrl={this.state.imgUrl || "default_user.jpeg"}
                    />
                    <h2 onClick={this.toggleUploader}>
                        Change state with a method: toggleUploader
                        {this.state.uploaderIsVisible && "🐵"}
                        {!this.state.uploaderIsVisible && "🙈"}
                    </h2>
                    {this.state.uploaderIsVisible && (
                        <Uploader methodInApp={this.methodInApp} />
                    )}
                </div>
                <Uploader />
            </div>
        );
    }
}
