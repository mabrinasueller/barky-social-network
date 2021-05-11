import React, { Component } from "react";
import Uploader from "./Uploader";
import axios from "./axios";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("App just mounted");
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
                <h1>Bonjour</h1>
                <img src="./placeholder.gif" />;
            </div>
        );
    }
}
