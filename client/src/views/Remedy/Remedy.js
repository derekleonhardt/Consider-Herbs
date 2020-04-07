import React from 'react';
import logo from '../../assets/logo.svg';
import './Remedy.css';



const Register = () => {
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

    const gallery = arr.map((item) => {
        return(
        <figure className = "galleryItem">
            <h2 className = "galleryTitle">{item.name}</h2>
            <img className = "galleryImage" src = {item.src}></img>
            <figcaption>{item.caption}</figcaption>
        </figure>
    )})

    function myfunction() {}

    return (
        <>
            
            <div className="remedy">
                <h1 className = "remedyTitle">Find A Remedy</h1>
                    <p className="pain">Where is your pain located?</p> 

                    
                    <img src="logos/body-1.jpg" className="body"/> 
                    
                    
                    <button className="arm">Arm</button>
                    <button className="back">Back</button>
                    <button className="chest">Chest</button>
                    <button className="ears">Ears</button>
                    <button className="eyes">Eyes</button>
                    <button className="face">Face</button>
                    <button className="feet">Feet</button>
                    <button className="fingers">Fingers</button>
                    <button className="hands">Hands</button>
                    <button className="head">Head</button>
                    <button className="knee">Knee</button>
                    <button className="legs">Legs</button>
                    <button className="lips">Lips</button>
                    <button className="mouth">Mouth</button>
                    <button className="stomach">Stomach</button>
                    <button className="throat">Throat</button>
                    <button className="wrist">Wrist</button>
                    
                    
                    
                    


                        
                    
                    



                <div className = "suggestions">
                <h2 className = "inspoTitle">Suggested Herbs</h2>
                <div className = "herbGallery">
                   {gallery}                    
                </div>
                
            </div>
                
            </div>
            
        </>
    );
}
export default Register;