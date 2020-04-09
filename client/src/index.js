// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";
import history from "./utils/history";

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

let config_ = {};
fetch(`http://127.0.0.1:5000/auth`).then(res =>{
  res.json().then(data => {
    config_ = data;
    console.log(data);
  }).then(() => {
    ReactDOM.render(
      <Auth0Provider
        domain={config_.domain}
        client_id={config_.clientId}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
      >
        <Router>
        <App />
        </Router>
      </Auth0Provider>,
      document.getElementById("root")
    );
  }).catch(() => {
    ReactDOM.render(
        <Router>
        <App />
        </Router>,
      document.getElementById("root")
    );
  })
})


serviceWorker.unregister();