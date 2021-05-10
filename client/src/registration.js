import React, { Component } from "react";
import axios from "axios";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // error: true,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        };
    }
    submit() {
        axios
            .post("/registration", {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            })
            .then(({ data }) => {
                if (data.success) {
                    // res.json({ success: true }); in server.js
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
                <h2>
                    If you want to become part of the experience and stay in
                    touch, please register:
                </h2>
                {this.state.error && (
                    <div className="error">Something went wrong</div>
                )}
                {/* <input onChange={(e) => this.handleChange(e)} />
                <button onClick={() => this.submit()}>Submit</button> */}

                <form className="form">
                    <div className="form__group">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="form__input"
                            name="firstName"
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>
                    <div className="form__group">
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="form__input"
                            name="lastName"
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>

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
                        type="button"
                        onClick={() => this.submit()}
                    >
                        Register
                    </button>
                </form>
            </div>
        );
    }
}
