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
                        src="../hamburgermenu.png"
                        alt="NavBar-Hamburger"
                        className="hamburger-navbar clicked"
                        onClick={() => this.toggleMenu()}
                    />
                )}
                {this.state.showMenu && (
                    <>
                        <div className="overlay"></div>
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
                                <Link to="/">Profile</Link>
                                <Link to="/users">Find Users</Link>
                                <Link to="/friends">Friends</Link>
                                <a href="/logout" className="logout">
                                    Logout
                                </a>
                            </div>
                        </div>
                    </>
                )}
            </>
        );
    }
}
