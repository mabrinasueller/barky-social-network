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
            <div className="register-background-container">
                <div className="register-container-big">
                    <div className="logo-container">
                        <img src="./test2.jpeg" className="remove-on-mobile" />
                    </div>
                    <div className="registration-container">
                        <div className="registration-text-container">
                            <div className="registration-text">
                                {/* <h1>Get started!</h1>
                                <h2>Create new account</h2> */}
                            </div>
                            <div className="logo-small">
                                <img src="../logo2.png" />
                            </div>
                        </div>
                        <div className="registration-form-container">
                            {this.state.error && (
                                <div className="error">
                                    Something went wrong
                                </div>
                            )}

                            <form className="form">
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
                            </form>

                            <p className="login-link-container">
                                Already have an account?
                                <Link to="/login"> Sign in</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//             <div className="main-registration">
//                 <section className="signup">
//                     <div className="container">
//                         <div className="signup-content">
//                             <div className="signup-form">
//                                 <h2 className="form-title">Sign up</h2>
//                                 <form
//                                     method="POST"
//                                     className="register-form"
//                                     id="register-form"
//                                 >
//                                     <div className="form-group">
//                                         <label htmlFor="name">
//                                             <i className="zmdi zmdi-account material-icons-name"></i>
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="name"
//                                             id="name"
//                                             placeholder="Your Name"
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label htmlFor="email">
//                                             <i className="zmdi zmdi-email"></i>
//                                         </label>
//                                         <input
//                                             type="email"
//                                             name="email"
//                                             id="email"
//                                             placeholder="Your Email"
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label htmlFor="pass">
//                                             <i className="zmdi zmdi-lock"></i>
//                                         </label>
//                                         <input
//                                             type="password"
//                                             name="pass"
//                                             id="pass"
//                                             placeholder="Password"
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label htmlFor="re-pass">
//                                             <i className="zmdi zmdi-lock-outline"></i>
//                                         </label>
//                                         <input
//                                             type="password"
//                                             name="re_pass"
//                                             id="re_pass"
//                                             placeholder="Repeat your password"
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <input
//                                             type="checkbox"
//                                             name="agree-term"
//                                             id="agree-term"
//                                             className="agree-term"
//                                         />
//                                         <label
//                                             htmlFor="agree-term"
//                                             className="label-agree-term"
//                                         >
//                                             <span>
//                                                 <span></span>
//                                             </span>
//                                             I agree all statements in{" "}
//                                             <a
//                                                 href="#"
//                                                 className="term-service"
//                                             >
//                                                 Terms of service
//                                             </a>
//                                         </label>
//                                     </div>
//                                     <div className="form-group form-button">
//                                         <input
//                                             type="submit"
//                                             name="signup"
//                                             id="signup"
//                                             className="form-submit"
//                                             value="Register"
//                                         />
//                                     </div>
//                                 </form>
//                             </div>
//                             <div className="signup-image">
//                                 <figure>
//                                     <img
//                                         className="register-image"
//                                         src="./register-image.png"
//                                         alt="sing up image"
//                                     />
//                                 </figure>
//                                 <a href="#" className="signup-image-link">
//                                     I am already member
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </div>
//         );
//     }
// }
