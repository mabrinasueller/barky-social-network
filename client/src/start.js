import ReactDOM from "react-dom";
import Welcome from "./Welcome";
import App from "./app";
import { io } from "socket.io-client";
import { Provider } from "react-redux";
import reducer from "./reducer";
import "mapbox-gl/dist/mapbox-gl.css";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { init } from "./Socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

io.connect();

const socket = io();

socket.on("welcome", function (data) {
    console.log(data);
    socket.emit("thanks", {
        message: "Thank you. It is great to be here.",
    });
});

if (location.pathname == "/welcome") {
    ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
    init(store);
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.querySelector("main")
    );
}
