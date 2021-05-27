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
    submit(e) {
        e.preventDefault();
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
                <div className="register-background-container">
                    <div className="register-container-big">
                        <div className="logo-container">
                            <img src="./test3.jpeg" />
                        </div>
                        <div className="registration-container">
                            <div className="registration-text-container">
                                <h1 className="text-login">
                                    Forgot your password?
                                </h1>

                                <h4>
                                    Please enter your email-address and check
                                    <div className="breaker"></div>
                                    your emails for the verification code.
                                </h4>
                                <h4 className="reset-text-step2">
                                    In Step 2 you can update your password.{" "}
                                </h4>
                            </div>
                            <div className="registration-form-container">
                                {this.state.error && (
                                    <div className="error">
                                        Something went wrong. Please try again.
                                    </div>
                                )}

                                <div className="form-group">
                                    <input
                                        type="email"
                                        placeholder="woof@example.com"
                                        className="form-input"
                                        name="email"
                                        required
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>
                                <div className="breaker"></div>
                                <button
                                    className="form-button"
                                    type="submit"
                                    onClick={(e) => this.submit(e)}
                                >
                                    Send verification code
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.view === 2) {
            return (
                <div className="register-background-container">
                    <div className="register-container-big">
                        <div className="logo-container">
                            <img src="./test5.jpeg" />
                        </div>
                        <div className="registration-container">
                            <div className="registration-text-container">
                                <h1 className="text-login">Step 2</h1>

                                <h4>
                                    Please enter the verification code and set
                                    <div className="breaker"></div>
                                    your new password.
                                </h4>
                            </div>
                            <div className="registration-form-container">
                                {this.state.error && (
                                    <div className="error">
                                        Something went wrong. Please try again.
                                    </div>
                                )}

                                <form className="form">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            placeholder="Verification code"
                                            className="form-input"
                                            key=""
                                            name="code"
                                            required
                                            onChange={(e) =>
                                                this.handleChange(e)
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            placeholder="Enter new password"
                                            className="form-input"
                                            name="password"
                                            required
                                            onChange={(e) =>
                                                this.handleChange(e)
                                            }
                                        />
                                    </div>
                                    <div className="breaker"></div>
                                    <button
                                        className="form-button"
                                        type="button"
                                        onClick={(e) => this.submit(e)}
                                    >
                                        Set new password
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if (this.state.view === 3) {
            return (
                <div className="register-background-container">
                    <div className="register-container-big">
                        <div className="logo-container">
                            <img src="./test4.jpeg" />
                        </div>
                        <div className="registration-container">
                            <div className="registration-text-container">
                                <h1 className="text-login">
                                    Password has been successfully updated!
                                </h1>
                            </div>
                            <div className="registration-form-container">
                                <Link to="/login">Click here to login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        return this.determineViewToRender();
    }
}
