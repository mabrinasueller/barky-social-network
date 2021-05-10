import React, { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 1,
        };
    }
    submit() {
        axios
            .post("/password-reset", {
                email: this.state.email,
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    console.log("error");
                    this.setState({
                        error: true,
                    });
                }
            });
    }
    handleChange({ target }) {
        console.log(target.value);
        this.setState({
            [target.name]: target.value,
        });
    }
    render() {
        return (
            <div>
                {this.state.error && (
                    <div className="error">Email does not exist</div>
                )}
                <form>
                    <div className="form__group">
                        <input
                            type="password"
                            placeholder="Password"
                            className="form__input"
                            name="password"
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>

                    <button
                        className="btn"
                        type="button"
                        onClick={() => this.submit()}
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}
