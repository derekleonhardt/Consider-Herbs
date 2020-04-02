import React from 'react';
import { Link } from 'react-router-dom';
import './UserHome.css';


const UserHome = (props) => {
    return(
        <>
        <div className="otherinspo">
            <h1 classname="welcome"> Thank you for Considering Herbs. </h1>
        
            <div className="sites">   
                <embed className="web" src="https://learningherbs.com/"/>
                <embed className="web" src="https://permies.com/"/>
                <embed className="web" src="https://www.healthline.com/"/>
            </div>
        </div>
        
        </>
    );
}
export default UserHome;