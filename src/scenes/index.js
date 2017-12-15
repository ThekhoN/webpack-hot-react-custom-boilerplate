import React from "react";
import { Route, Switch } from "react-router-dom";

const Todo = () => <h2>Todo</h2>;

const AboutMe = () => <h2>About Me</h2>;

const Login = () => <h2>Login</h2>;

const Scenes = () => (
  <Switch>
    <Route exact path="/" component={Todo} />
    <Route path="/login" component={Login} />
    <Route path="/about-me" component={AboutMe} />
  </Switch>
);

export default Scenes;
