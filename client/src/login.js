import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // email: "",
            // password: "",
        };
    }

    handleChange({ target }) {
        console.log(target.value);
        this.setState({
            [target.name]: target.value,
        });
    }

    async submit() {
        try {
            const { data } = await axios.post("/login", {
                email: this.state.email,
                password: this.state.password,
            });
            if (data.success) {
                location.replace("/");
            } else {
                console.log("error");
                this.setState({
                    error: "Wrong Email/password",
                });
            }
        } catch (error) {
            console.log("Error in /login route: ", error);
        }
    }

    render() {
        return (
            <div>
                <div className="register-background-container">
                    <div className="register-container-big">
                        <div className="logo-container">
                            <img src="./Wauz7.png" />
                        </div>
                        <div className="registration-container">
                            <div className="registration-text-container">
                                <div className="login-text">
                                    <div className="logo-small">
                                        <img
                                            src="../logo.svg"
                                            className="remove-on-mobile"
                                        />
                                    </div>
                                    <h1 className="text-login">
                                        Back for good?
                                    </h1>
                                    <div className="spacer"></div>
                                    <h2>Please sign in</h2>
                                </div>
                                {this.state.error}
                            </div>

                            <div className="registration-form-container">
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

                                <div className="form-group">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="form-input"
                                        name="password"
                                        required
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>
                                <div className="breaker"></div>
                                <button
                                    className="form-button"
                                    type="submit"
                                    onClick={() => this.submit()}
                                >
                                    Log In
                                </button>

                                <div className="passwort-reset-link">
                                    <Link to="/password-reset">
                                        I forgot my password
                                    </Link>
                                </div>
                                <div className="breaker"></div>
                                <div className="link-to-register">
                                    <Link to="/">Click here to Register</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
