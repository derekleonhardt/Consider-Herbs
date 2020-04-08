import React, {useState} from "react";
import logo from '../../assets/logo.svg';
import './Remedy.css';
import BrowseResults from "../../components/BrowseResults";




const Register = (props) => {

    const[results, setResults] = useState([]);
    if(results.length == 0) props.defaultGlossary(setResults);
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
                    
                    
                    <div className="inspoTitle"> Suggested Recipes </div>
                    <div className ="searchBar">
                    <img src = "logos/search.png"/>
                    <input type = "text" placeholder = "Search For Herbs" onChange = {e => props.searchGlossary(e, setResults)}/>
                    </div> 
                    <BrowseResults
                        results = {results.data}
                    />
                    


                        
                    
                    



                
                
            </div>
            
        </>
    );
}
export default Register;