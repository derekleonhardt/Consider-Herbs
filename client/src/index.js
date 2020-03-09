import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { Auth0Provider } from './contexts/auth0-context';

ReactDOM.render(
    <Auth0Provider>
    <Router>
        <App />
    </Router>
    </Auth0Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
