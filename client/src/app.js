import React, { Component } from "react";
import Uploader from "./Uploader";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    componentDidMount() {
        console.log("App just mounted");
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
