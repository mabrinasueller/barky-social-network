import { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTextArea: false,
        };
    }

    handleBioChange(e) {
        e.preventDefault();
    }

    submitBio() {}

    render() {
        return (
            <div>
                <h3>I am a bio editor</h3>
                {this.state.showTextArea && (
                    <div>
                        <textarea></textarea>
                    </div>
                )}
            </div>
        );
    }
}
