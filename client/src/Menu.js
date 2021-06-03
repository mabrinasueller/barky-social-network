import { Component } from "react";
import { Link } from "react-router-dom";

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
        };
    }

    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu,
        });
    }

    render() {
        return (
            <>
                {!this.state.showMenu && (
                    <img
                        src="../hamburgermenu.svg"
                        alt="NavBar-Hamburger"
                        className="hamburger-navbar clicked"
                        onClick={() => this.toggleMenu()}
                    />
                )}
                {this.state.showMenu && (
                    <>
                        <div
                            className="overlay"
                            onClick={() => this.toggleMenu()}
                        ></div>
                        <div className="navbar-container">
                            <span
                                className="close-navbar-button clicked"
                                onClick={() => this.toggleMenu()}
                            >
                                x
                            </span>
                            <div
                                className="links-navbar"
                                onClick={() => this.toggleMenu()}
                            >
                                <Link to="/users">Find Users</Link>
                                <Link to="/chat">Chat</Link>
                                <Link to="/messages">Messages</Link>
                                <Link to="/friends">Friends</Link>
                                <Link to="/">Profile</Link>
                                <Link to="/edit">Edit Profile</Link>
                                <Link to="/about">About us</Link>

                                <a href="/logout" className="logout">
                                    Logout
                                </a>

                                <Link
                                    to="/delete/account"
                                    className="delete-account-link"
                                >
                                    Delete your account
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </>
        );
    }
}
