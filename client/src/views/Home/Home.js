import React from 'react';
import logo from '../../assets/logo.svg';
import './Home.css';
import SignUp from "../../components/Header/SignUp";

function Home() {
    return (
        <>
        <SignUp />
            <div className="About">
                <img src="logos/aboutBackground.jpeg" className="About-image" />
                <img src="logos/Dee.jpeg" className="Dee-image" />
                <p className="about-text">About</p>
                <figure className="info">
                    Welcome to my site. My intentions are to present the information in a fun, inviting easy digestible format. One that will reignite that natural innate desire to return to a more holistic earth based approach to our health and well being. Do you remember your first introduction? Some people started with an oil, other with teas or a fresh herb in a dish. I remember how a few sniffs of a peppermint oil suggested by a friend relieved an headache almost instantly. I was hooked and the desire and passion was born to learn , share and help people experience the joy of listening to our body and healing with nature.
                </figure>   
            </div>
        </>
    );
}

export default Home;
