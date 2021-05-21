import { Component } from "react";
import axios from "./axios";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("props in Uploader: ", this.props);
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.files[0],
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", this.state.file);
        try {
            const { data } = await axios.post("/upload", formData);
            const { img_url } = data;
            this.props.updateProfilePic(img_url);
        } catch (error) {
            console.log("error: ", error);
            this.setState({
                error: "We are sorry, something went wrong. Please try again.",
            });
        }
    }

    render() {
        return (
            <>
                <div className="overlay"></div>
                <div className="modal-container">
                    <div className="modal-text-container">
                        <h3>Update your profile picture</h3>
                    </div>

                    <input
                        type="file"
                        name="file"
                        className="inputfile"
                        onChange={(e) => this.handleChange(e)}
                    ></input>
                    <div className="modal-buttons">
                        <button onClick={(e) => this.handleSubmit(e)}>
                            Upload
                        </button>
                        <button href="#" onClick={this.props.toggleUploader}>
                            Cancel
                        </button>
                    </div>
                </div>
            </>
        );
    }
}
