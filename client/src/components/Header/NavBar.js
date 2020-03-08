import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <div className = "header">
            {/* Logo */}
            <div className = "social-bar">
                <Link className = "nav-title" to="/">
                    <img className = "nav-logo" src={ "/logo192.png" } alt="React logo" />
                </Link>
            </div>
            {/* Page Links */}
            <div className = "nav-items">
                <Link className = "nav-link" to='/Home'>Browse Herbs</Link>
                <Link className = "nav-link" to='/Remedy'>Find a Remedy</Link>
                <Link className = "nav-link" to ='/Chat'>Chat With Others</Link>
                <Link className = "nav-link" to ='/Book'>Book Consultation</Link>
                {/* <a className = "nav-link" target='_blank' rel="noopener noreferrer" href="https://reactjs.org/docs/getting-started.html">
                    React Docs
                </a> */}
            </div>

        </div>
    )
};

export default NavBar;
