import { Component } from "react";

export default class DarkMode extends Component {
    constructor() {
        super();
        this.state = {
            activeDarkMode: false,
        };
        this.toggleDarkMode = this.toggleDarkMode.bind(this);
    }

    toggleDarkMode() {
        // console.log("Moon was clicked");
        this.setState({
            activeDarkMode: !this.state.activeDarkMode,
        });
        document.querySelector("body").classList.toggle("dark-theme");
    }

    render() {
        console.log("this.state.darkmode: ", this.state.activeDarkMode);
        return (
            <>
                <div
                    className={
                        this.state.activeDarkMode ? "dark-theme" : "light-theme"
                    }
                    onClick={this.toggleDarkMode}
                >
                    <img
                        onClick={() => this.toggleDarkMode}
                        src={
                            this.state.activeDarkMode
                                ? "../sun.svg"
                                : "../moon.svg"
                        }
                        alt="moon-symbol"
                        className="moon-symbol"
                    />
                </div>
            </>
        );
    }
}

// import { useState } from "react";

// export default function DarkMode() {
//     const [isActive, setActive] = useState(false);
//     const toggleDarkMode = () => {
//         setActive(!isActive);
//         console.log("Moon was clicked");
//     };

//     return (
//         <div className={isActive ? "dark" : null} onClick={toggleDarkMode}>
//             <img
//                 // onClick={() => this.toggleDarkMode}
//                 src="../moon.png"
//                 alt="moon-symbol"
//                 className="moon-symbol dark"
//             />
//         </div>
//     );
// }
