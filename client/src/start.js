import ReactDOM from "react-dom";
import Welcome from "./welcome";
//no curly brackets, cause export default

if (location.pathname == "/welcome") {
    ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
    ReactDOM.render(
        <img src="./placeholder.gif" />,
        document.querySelector("main")
    );
}
