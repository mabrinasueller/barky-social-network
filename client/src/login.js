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
    submit(e) {
        e.preventDefault();
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password,
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
                    <div className="error">Wrong Email/password</div>
                )}
                <form>
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
        );
    }
}
