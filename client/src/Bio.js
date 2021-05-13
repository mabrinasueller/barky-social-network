import { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        console.log("props: ", props);
        this.state = {
            showTextArea: false,
        };
    }

    handleBioChange({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("test: ", this.state.draftbio);
        if (!this.state.draftbio) {
            this.toggleBio();
            return;
        }

        axios
            .post("/update-bio", { bio: this.state.draftbio })
            .then(({ data }) => {
                const { bio } = data;
                console.log("bio: ", bio);
                this.props.setBio(bio);
                this.toggleBio();
            })
            .catch((error) => {
                console.log("error in handleSubmit: ", error);
                this.setState({
                    error: "Bio couldn't be updated, please try again.",
                });
            });
    }

    toggleBio() {
        this.setState({
            showTextArea: !this.state.showTextArea,
        });
    }

    render() {
        return (
            <div>
                {!this.state.showTextArea &&
                    (this.props.bio ? (
                        <button onClick={(e) => this.toggleBio(e)}>
                            Edit Bio
                        </button>
                    ) : (
                        <button onClick={(e) => this.toggleBio(e)}>
                            Add Bio
                        </button>
                    ))}
                {this.state.showTextArea && (
                    <>
                        <textarea
                            onChange={(e) => this.handleBioChange(e)}
                            name="draftbio"
                            defaultValue={this.state.draftbio}
                        ></textarea>
                        <button
                            type="submit"
                            onClick={(e) => this.handleSubmit(e)}
                        >
                            Save
                        </button>
                        <button onClick={(e) => this.toggleBio(e)}>
                            Cancel
                        </button>
                    </>
                )}
            </div>
        );
    }
}
