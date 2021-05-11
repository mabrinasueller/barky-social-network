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
    }
    componentDidMount() {
        console.log("App just mounted");
        axios.get("/user").then(({ data }) => {
            this.setState({
                firstName: data.firstName,
                lastName: data.lastName,
                imgUrl: data.imgUrl,
            });
        });
    }

    toggleUploader() {
        this.setState({ uploaderVisible: !this.state.uploaderVisible });
    }

    methodInApp(arg) {
        console.log("argument methodInApp got passed: ", arg);
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
                        lastName={this.lastName}
                        imgUrl={this.state.imgUrl || "default_user.jpeg"}
                    />
                </div>
                <Uploader />
            </div>
        );
    }
}
