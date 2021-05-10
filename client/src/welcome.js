import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";

export default function Welcome() {
    return (
        <div>
            <img src="./placeholder.gif"></img>
            <h1>So glad to have you here!</h1>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    {/* <Route path="/password-reset" component={Login} /> */}
                </div>
            </HashRouter>
        </div>
    );
}
