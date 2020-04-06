import React from 'react';
import { Link } from 'react-router-dom';
import Auth0 from "../auth0.js";
import "./SignUp.css";

const SignUp = (props) => {
    return (
        <div className= "background">
            <div className = "box">
                <h1 color='white'>Why Not Consider Herbs?</h1>
                
                <Auth0 className = "login">Login</Auth0>
            </div>
        </div>
    )
};

export default SignUp;
