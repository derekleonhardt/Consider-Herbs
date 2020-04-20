import React, { useState } from 'react';
import {Button} from 'semantic-ui-react';
import 'semantic-ui-react';
import './NoAccount.css';
import Auth0 from './../../components/auth0';
import { useRouteMatch } from 'react-router-dom';
const NoAccount = (props) => {
    let route = (useRouteMatch());
    return(
            <div className = "NoAccount">
        {
            (route.path == "/Book") &&
            <>
                <p>Make an acccount to view this content!</p>
                <Auth0 className = "login">Login</Auth0>
            </>
        }
        {
            (route.path == "/Remedy") &&
            <div>
                <p>Make a Premium acccount to view this content!</p>
                <Button positive  size="huge" className="button">Become A Premium Member</Button>
            </div>
        }
        {
            (route.path == "/Admin") &&
            <div>
                <p>Sorry, you dont have access to this page :(</p>
            </div>
        }
            </div>
    );
}
export default NoAccount;