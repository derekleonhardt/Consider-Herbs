import React, { useState } from 'react';
import './NoAccount.css';
import Auth0 from './../../components/auth0';
const Admin = () => {
    return(
        <div className = "NoAccount">
            <p>Make an acccount to view this content!</p>
            <Auth0 className = "login">Login</Auth0>
        </div>
    );
}
export default Admin;