import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 1,
        };
    }
    handleChange({ target }) {
        console.log(target.value);
        this.setState({
            [target.name]: target.value,
        });
    }
    submit() {
        this.setState({
            error: null,
        });
        if (this.state.view === 1) {
            axios
                .post("/password/reset/start", {
                    email: this.state.email,
                })
                .then(() => {
                    console.log("moving to view 2");
                    this.setState({ view: 2 });
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({
                        error: "An error occcured, please try again.",
                    });
                });
        } else if (this.state.view === 2) {
            axios
                .post("/password/reset/verify", {
                    email: this.state.email,
                    password: this.state.password,
                    code: this.state.code,
                })
                .then(() => {
                    console.log("moving to view 3");
                    this.setState({ view: 3 });
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({
                        error: "An error occcured, please try again.",
                    });
                });
        }
    }

    determineViewToRender() {
        if (this.state.view === 1) {
            return (
                <div className="flex flex-row flex-1 bg-white justify-center shadow-xl rounded-xl md: 4/5">
                    <div className="flex-1 ">
                        <img src="./logo-big.png" className="max-w-md p-5 " />
                    </div>
                    <div className="flex-1 w-96 align-center">
                        <form>
                            <div className="mt-40 overflow-hidden opacity-0 shadow-xl">
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="opacity-1"
                                    name="email"
                                    required
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
                </div>
            );
        } else if (this.state.view === 2) {
            return (
                <div>
                    <form>
                        <div className="form__group">
                            <input
                                type="text"
                                placeholder="Verification Code"
                                className="form__input"
                                name="code"
                                required
                                onChange={(e) => this.handleChange(e)}
                            />
                        </div>
                        <div className="form__group">
                            <input
                                type="password"
                                placeholder="Enter new Password"
                                className="form__input"
                                name="password"
                                required
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
        if (this.state.view === 3) {
            return (
                <div>
                    <h2>Password has been successfully updated!</h2>
                    <Link to="/login">Log into your profile</Link>
                </div>
            );
        }
    }

    render() {
        return this.determineViewToRender();
    }
}
