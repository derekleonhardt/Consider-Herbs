import React from 'react';
import { Link } from 'react-router-dom';
import Auth0 from "../auth0.js";
import './NavBar.css';

const NavBar = (props) => {
    return (
        <div className = "header">
            {/* Logo */}
            <div className = "social-bar">
                <Link className = "nav-title" to="/Home">
                    <img className = "main-logo" src={ "/logos/considerHerbsLogo.png" } alt="React logo" />
                </Link>
                <div className = "social-logos">
                    {
                        (props.userRole === "admin") &&
                        <Link className = "login" to="/Admin">
                            Admin Page
                        </Link>
                    }

                    <Auth0 className = "login" 
                    domain = {props.domain}
                    id = {props.clientId}
                    user = {props.user}
                    >
                        Login
                    </Auth0>
                    <a className = "social-link" href={'https://www.facebook.com/Consider-Herbs-276933896476422/'}>
                        <img className = "social-image" src={"/logos/facebookLogo.svg"}/>
                    </a>
                    <a className = "social-link" href={'https://www.instagram.com/considerherbs/'}>
                        <img className = "social-image" src = {"/logos/instagramLogo.svg"}/>   
                    </a>
                    <a className = "social-link" href={'mailto:dee@considerherbs.com'}>
                        <img className = "social-image" src = {"/logos/emailLogo.svg"}/>
                    </a>
                </div>
            </div>
            {/* Page Links */}
            <div className = "nav-items">
                <Link className = "nav-link" to='/Browse'>
                <img className = "nav-logo" src = {"/logos/browseLogo.svg"}></img>
                Browse Herbs
                </Link>
                <Link className = "nav-link" to='/Remedy'>
                <img className = "nav-logo" src = {"/logos/remedyLogo.svg"}></img>
                Find a Remedy</Link>
                <Link className = "nav-link" to ='/Chat'>
                <img className = "nav-logo" src = {"/logos/chatLogo.svg"}></img>
                Chat With Others</Link>
                <Link className = "nav-link" to ='/Book'>
                <img className = "nav-logo" src = {"/logos/bookLogo.svg"}></img>
                Book Consultation</Link>
            </div>

        </div>
    )
};

export default NavBar;
