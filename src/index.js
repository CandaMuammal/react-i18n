import React from "react";
import { createStore, combineReducers } from "redux";
import { render } from "react-dom";
import { connect, Provider } from "react-redux";
import { Router, Link, Redirect, Route, Switch } from "react-router-dom";
import { ConnectedRouter, routerReducer } from "react-router-redux";
import { createBrowserHistory } from "history";
import PathToRegexp, { compile, parse } from "path-to-regexp";
import { I18nextProvider } from "react-i18next";

import i18n from "./i18n";

import reducer from "./reducer";
import About from "./components/About";
import Home from "./components/Home";
import Topics from "./components/Topics";

const lang = i18n.language;

const store = createStore(
  combineReducers({
    app: reducer,
    routing: routerReducer
  })
);

const history = createBrowserHistory();

const generateLanguage = (locale, location) => {
  const ROUTE = "/:locale/:path*";
  const definePath = compile(ROUTE);
  const routeComponents = PathToRegexp(ROUTE).exec(location.pathname);

  let subPaths = null;
  if (routeComponents && routeComponents[2]) {
    subPaths = routeComponents[2].split("/");
  }

  return definePath({
    locale,
    path: subPaths
  });
};

const changeLanguage = lng => {
  i18n.changeLanguage(lng);
};

let App = ({ match, location }) => {
  console.log("location", location);
  console.log("match", match);

  if (lang != match.params.locale) {
    changeLanguage(match.params.locale);
  }
  return (
    <div>
      <ul>
        <li>
          <Link to={`${match.url}`}>Home</Link>
        </li>
        <li>
          <Link to={`${match.url}/about`}>About</Link>
        </li>
        <li>
          <Link to={`${match.url}/topics`}>Topics</Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route exact path={`${match.url}/`} component={Home} />
        <Route path={`${match.url}/about`} component={About} />
        <Route path={`${match.url}/topics`} component={Topics} />
      </Switch>
      <hr />
      <footer>
        <p>Current locale: {match.params.locale}</p>
        <p>Current path: {match.path}</p>
        <Link to={generateLanguage("vn", location)}>
          <button onClick={() => changeLanguage("vn")}>vn</button>
        </Link>

        <Link to={generateLanguage("en", location)}>
          <button onClick={() => changeLanguage("en")}>en</button>
        </Link>
      </footer>
    </div>
  );
};

App = connect(
  state => ({
    location: state.routing.location
  }),
  null
)(App);

const BasicExample = ({ store, history }) => (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/:locale" component={App} />
          <Redirect to="/en" />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </I18nextProvider>
);

render(<BasicExample store={store} history={history} />, document.body);
