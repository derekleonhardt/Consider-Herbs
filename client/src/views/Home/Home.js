import React from 'react';
import logo from '../../assets/logo.svg';
import './Home.css';
import 'semantic-ui-react';
import SignUp from "../../components/Header/SignUp";

function Home(props) {
    return (
        <>
        <SignUp />
        <div className="App">
        </div>
        </>
    );
}

export default Home;
