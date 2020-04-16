import React from 'react';
import logo from '../../assets/logo.svg';
import {Link} from 'react-router-dom';
import './Home.css';
import 'semantic-ui-react';
import SignUp from "../../components/Header/SignUp";

const Home = (props) => {
    const arr = [];
    arr.push({
        name: "Lavender",
        src: "logos/Lavender.png",
        caption:"Lavender has a long history of use to boost appetite and mood, as well as relieve gastrointestinal problems and anxiety."
    },{
        name: "Eucalyptus",
        src: "logos/Eucalyptus.png",
        caption: "People use eucalyptus for many conditions including asthma, bronchitis, plaque and gingivitis, head lice, toe nail fungus, and many others"
    },{
        name: "Rosemary",
        src: "logos/Rosemary.png",
        caption: "Anti-cancer properties(for certain cancers) and anti-inflammatory properties,discourages hair loss and boosts growth,improves memory, liver boosting."
    });
    const gallery = arr.map((item, index) => {
        return(
        <figure key = {index} className = "galleryItem">
            <h2 className = "galleryTitle">{item.name}</h2>
            <img className = "galleryImage" src = {item.src}></img>
            <figcaption>{item.caption}</figcaption>
        </figure>
    )})
    return (
        <>
            <SignUp />
            <div className="about">
                <h1 className = "aboutTitle">About</h1>
                <div className = "deeContent">
                    <img src="logos/Dee.jpeg" className="dee" />
                    <p className="info">
                        Welcome to my site. My intentions are to present the information in a fun, inviting easy digestible format. One that will reignite that natural innate desire to return to a more holistic earth based approach to our health and well being. Do you remember your first introduction? Some people started with an oil, other with teas or a fresh herb in a dish. I remember how a few sniffs of a peppermint oil suggested by a friend relieved an headache almost instantly. I was hooked and the desire and passion was born to learn , share and help people experience the joy of listening to our body and healing with nature.
                    </p>  
                </div> 
                <h2 className = "booking"><Link to ='/Book'>Book Consultation</Link></h2>
            </div>
            <div className = "herbInspiration">
                <h2 className = "inspoTitle">Herb Inspiration</h2>
                <div className = "herbGallery">
                   {gallery}                    
                </div>
                <h2 className = "findHerbs"><Link to ='/Browse'>Find More Herbs</Link></h2>
            </div>
        </>
    );
}

export default Home;
