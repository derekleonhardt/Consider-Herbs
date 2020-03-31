import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <div className = "header">
            {/* Logo */}
            <div className = "social-bar">
                <Link className = "nav-title" to="/Home">
                    <img className = "main-logo" src={ "/logos/considerHerbsLogo.png" } alt="React logo" />
                </Link>
                <div className = "social-logos">
                    <img className = "social-image" src = {"/logos/facebookLogo.svg"}/>
                    <img className = "social-image" src = {"/logos/instagramLogo.svg"}/>
                    <img className = "social-image" src = {"/logos/emailLogo.svg"}/>
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
                {/* <a className = "nav-link" target='_blank' rel="noopener noreferrer" href="https://reactjs.org/docs/getting-started.html">
                    React Docs
                </a> */}
            </div>

        </div>
    )
};

export default NavBar;
