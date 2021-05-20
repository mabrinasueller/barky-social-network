import ReactDOM from "react-dom";
import Welcome from "./Welcome";
import App from "./app";
import { Provider } from "react-redux";
import reducer from "./reducer";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

if (location.pathname == "/welcome") {
    ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.querySelector("main")
    );
}
