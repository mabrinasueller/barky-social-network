import React, { Component } from "react";
import axios from "./axios";

export default class Uploader extends Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        console.log("props in Uploader: ", this.props);
    }
    methodInUploader() {
        this.props.methodInApp();
    }

    render() {
        return (
            <>
                <h3>Let me help you upload things</h3>
                <h2 onClick={() => this.methodInUploader()}>
                    Click here to upload
                </h2>
            </>
        );
    }
}
