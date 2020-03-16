import React from 'react';
import logo from '../../assets/logo.svg';
import './Home.css';
import SignUp from "../../components/Header/SignUp";

function Home() {
    return (
        <>
        <SignUp />
        <div className="App">
            <header className="App-header">
                <img src="logos/aboutBackground.jpeg" className="About-image" />
                <img src="logos/Dee.jpeg" className="Dee-image" />
                
                <p className="about-text">
                    About
                </p>
                <a className="About-info"></a>
                
            </header>
        </div>
        </>
    );
}

export default Home;
