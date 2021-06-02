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
                        <div className="logo-header-container">
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
                                Join Barky and meet cool dogs and owners
                                <div className="breaker"></div>
                                in Berlin!
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
                    <div className="small-middle-container">
                        <p>
                            Find like minded dog owners and explore new routes
                            with them!
                        </p>
                    </div>
                    <div className="small-middle-container">
                        <p>Show other members your favorite spots in Berlin!</p>
                    </div>
                    <div className="small-middle-container">
                        <p>
                            Interact with other members through messages and our
                            open chat
                        </p>
                    </div>
                </div>
                <div className="registration-container">
                    <div className="registration-middle-left">
                        <img src="../Wauz6.png" />
                    </div>

                    <div className="registration-form-container">
                        <div className="profile">
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
                                className="form-button"
                                type="button"
                                onClick={() => this.handleSubmit()}
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
                <div className="small-last-container"></div>
            </>
        );
    }
}

{
    /* <div className="register-background-container">
    <div className="register-container-big">
        <div className="left-container">
            <div className="logo-small">
                <img src="../logo.svg" />
            </div>
            <h1>
                You&#39;ll never
                <div className="spacer"></div>
                walk alone
            </h1>
            <h3>
                Meet cool dogs and owners on <strong>Barky</strong>,
                <div className="breaker"></div>
                the platform for dog-walking-partners
                <div className="breaker"></div> in Berlin!
            </h3>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <p> Keeping dogs busy since 2021 </p>
        </div>
        <div className="registration-container">
            <div className="registration-text-container">
                <div></div>
                <div className="registration-text">
                    <h2>Create new account</h2>
                </div>
            </div>
            <div className="registration-form-container">
                {this.state.error && (
                    <div className="error">Something went wrong</div>
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
                    className="form-button"
                    type="button"
                    onClick={() => this.handleSubmit()}
                >
                    Sign up
                </button>

                <p className="login-link-container">
                    Already have an account?
                    <Link to="/login"> Sign in</Link>
                </p>
            </div>
        </div>
    </div>
</div>; */
}
