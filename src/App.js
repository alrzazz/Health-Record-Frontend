import React, { Component } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  HashRouter as Router,
} from "react-router-dom";
import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";
import Login from "./components/auth/Login";
import store from "./store";
import { loadUser } from "./actions/auth";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/addDoctor" component={addDoctor} />
            <Route exact path="/addPatient" component={addPatient} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
