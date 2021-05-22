import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }
    async submit(e) {
        e.preventDefault();
        try {
            const { data } = axios.post("/login", {
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

    handleChange({ target }) {
        console.log(target.value);
        this.setState({
            [target.name]: target.value,
        });
    }
    render() {
        return (
            <div>
                <div className="register-background-container">
                    <div className="register-container-big">
                        <div className="logo-container">
                            <img src="./test1.jpeg" />
                        </div>
                        <div className="registration-container">
                            <div className="registration-text-container">
                                <h1 className="text-login">Back for good?</h1>

                                <h2>Please sign in</h2>
                            </div>
                            <div className="registration-form-container">
                                {this.state.error && (
                                    <div className="error">
                                        Wrong Email/password
                                    </div>
                                )}

                                <form className="form">
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="form-input"
                                            name="email"
                                            required
                                            onChange={(e) =>
                                                this.handleChange(e)
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="password"
                                            placeholder="Password"
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
                                        className="btn"
                                        type="submit"
                                        onClick={(e) => this.submit(e)}
                                    >
                                        Log In
                                    </button>
                                </form>

                                <Link to="/">Click here to Register!</Link>
                                <br />
                                <Link to="/password-reset">
                                    I forgot my password
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

{
    /* <div className="flex flex-row flex-1 bg-white rounded-xl shadow-xl md: 4/5">
    <div className="flex-1">
        <img src="./logo-big.png" className="max-w-md p-5" />
    </div>
    <div className="flex flex-1 flex-col pr-4 m-auto ">
        {this.state.error && <div className="error">Wrong Email/password</div>}
        <div className="flex-1 w-96">
            <form className="form">
                <div className="form__group">
                    <input
                        type="email"
                        placeholder="Email"
                        className="form__input"
                        name="email"
                        onChange={(e) => this.handleChange(e)}
                    />
                </div>
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
                    type="submit"
                    onClick={(e) => this.submit(e)}
                >
                    Log In
                </button>
            </form>
            <Link to="/">Click here to Register!</Link>
            <br />
            <Link to="/password-reset">I forgot my password</Link>
        </div>
    </div>
</div>; */
}
