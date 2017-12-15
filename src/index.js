import React from "react";
import ReactDOM from "react-dom";
import "./styles-global/style.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AppContainer } from "react-hot-loader";

import Scenes from "./scenes";

// check localStorage for authentication
if (window.localStorage) {
    const user = localStorage.getItem("user");
    if (user) {
        store.dispatch({
            type: "AUTH_USER",
            payload: user
        });
    } else {
        store.dispatch({ type: "UNAUTH_USER" });
    }
}

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Router>
                    <Component />
                </Router>
            </Provider>
        </AppContainer>,
        document.getElementById("root")
    );
};

render(Scenes);

if (module.hot) {
    module.hot.accept("./scenes", () => {
        render(Scenes);
    });
}
