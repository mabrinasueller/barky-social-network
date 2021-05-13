import { HashRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Reset from "./Reset";

export default function Welcome() {
    return (
        <div className="content">
            <header></header>
            <div className="logo">
                <img src="./logo.png" />
            </div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/password-reset" component={Reset} />
                </div>
            </HashRouter>
        </div>
    );
}
