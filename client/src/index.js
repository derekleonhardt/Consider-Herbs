// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { Auth0Provider } from "./react-auth0-spa";
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

let config = {};
fetch(`/auth`).then(res =>{
  res.json().then(data => {
    config = data;
  }).then(() => {
    ReactDOM.render(
      <Auth0Provider
        audience = {config.audience}
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
      >
        <Router>
        <App config = {config}/>
        </Router>
      </Auth0Provider>,
      document.getElementById("root")
    );
  })
})


serviceWorker.unregister();