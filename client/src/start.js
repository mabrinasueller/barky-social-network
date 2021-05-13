import ReactDOM from "react-dom";
import Welcome from "./Welcome";
import App from "./App";

if (location.pathname == "/welcome") {
    ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
    ReactDOM.render(<App />, document.querySelector("main"));
}
