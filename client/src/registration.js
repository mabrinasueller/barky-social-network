import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        };
    }
    async handleSubmit() {
        try {
            await axios.post("/registration", {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            });
            location.replace("/");
        } catch (error) {
            console.log("error");
            this.setState({
                error: true,
            });
        }
    }
    handleChange({ target }) {
        console.log(target.value);
        this.setState({
            [target.name]: target.value,
        });
    }
    render() {
        return (
            <>
                <div className="landing-page-container">
                    <header className="header">
                        <div className="logo-header-container-landing">
                            <img
                                className="logo-small"
                                src="../logo.svg"
                                alt="logo"
                            />
                        </div>
                        <Link to="/login">
                            <button>Login</button>
                        </Link>
                    </header>
                    <div className="landing-container-big">
                        <div className="landing-text-big">
                            <h1>
                                You&#39;ll never
                                <div className="breaker"></div>
                                bark alone
                            </h1>
                            <div className="spacer"></div>
                            <h3>
                                Join Barky and meet cool dogs and
                                <div className="breaker"></div>
                                owners in Berlin!
                            </h3>
                            <div className="spacer"></div>
                            <button>Get started</button>
                        </div>
                        <div className="img-landing-container">
                            <img src="../Wauz.png" />
                        </div>
                    </div>
                </div>
                <div className="registration-middle-container">
                    <div className="middle-text-container">
                        <span>
                            Find like minded dog owners and explore new routes
                            with them!
                            <div className="breaker"></div>
                            Show other members your favorite spots in Berlin and
                            <div className="breaker"></div>
                            interact with them through messages and our open
                            chat.
                        </span>
                    </div>
                    <div className="dog-testimonials">
                        <p>
                            Not yet convinced? Just look at what members have to
                            say about <strong>Barky</strong>!
                        </p>
                        <div className="landing-dog-testimonials">
                            <div className="single-dog-testimonials">
                                <div className="small-middle-container">
                                    <img
                                        className="floating-dog-head"
                                        src="../46.png"
                                    />
                                </div>
                                <div className="small-middle-container">
                                    <img
                                        className="floating-dog-head"
                                        src="../45.png"
                                    />
                                </div>
                                <div className="small-middle-container">
                                    <img
                                        className="floating-dog-head"
                                        src="../44.png"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="registration-container-new">
                    <div className="registration-middle-left">
                        <img src="../Wauz6.png" />
                    </div>

                    <div className="registration-form-container-landing">
                        <div className="profile-new">
                            <div className="registration-text-container">
                                <div className="registration-text">
                                    <h2>Create new account</h2>
                                </div>
                            </div>
                            {this.state.error && (
                                <div className="error">
                                    Something went wrong
                                </div>
                            )}

                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Bark"
                                    className="form-input"
                                    name="firstName"
                                    onChange={(e) => this.handleChange(e)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Twain"
                                    className="form-input"
                                    name="lastName"
                                    required
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </div>

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
                            <div className="terms-container">
                                <label>
                                    <input type="checkbox" required />
                                    <span>
                                        {" "}
                                        I agree all statements in{" "}
                                        <a
                                            href="https://www.youtube.com/watch?v=tuB72KcEUTw"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Terms of service
                                        </a>
                                    </span>
                                </label>
                            </div>
                            <div className="breaker"></div>
                            <button
                                className="register-button"
                                type="button"
                                onClick={() => this.handleSubmit()}
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
                <div className="small-last-container"></div>
                <footer className="footer">
                    © Barky - Keeping dogs busy since 2021
                </footer>
            </>
        );
    }
}
