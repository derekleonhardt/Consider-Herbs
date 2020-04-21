import React, {useState} from "react";
import logo from '../../assets/logo.svg';
import './Remedy.css';
import BrowseRecipe from "../../components/BrowseRecipe";
import {Button} from 'semantic-ui-react';
import 'semantic-ui-react';




const Register = (props) => {

    const[results, setResults] = useState([]);
    if(results.length == 0) props.defaultRecipe(setResults);
    return (
        <>
            
            <div className="remedy">
                <h1 className = "remedyTitle">Find A Remedy</h1>
                <p className="pain">Where is your pain located?</p>

                <div className='bodyOutline'>
                    <button className='arm' value="arm" onClick = {e => props.searchRecipeByBody(e, setResults)}></button>
                    <button className="back" value="back" onClick = {e => props.searchRecipeByBody(e, setResults)}></button>
                    <button className="chest" value="chest" onClick = {e => props.searchRecipeByBody(e, setResults)}></button>
                    <button className="ears" value="ears" onClick = {e => props.searchRecipeByBody(e, setResults)}></button>
                    <button className="eyes" value="eyes" onClick = {e => props.searchRecipeByBody(e, setResults)}></button>
                    <button className="face" value="face" onClick = {e => props.searchRecipeByBody(e, setResults)}></button>
                    <button className="feet" value="feet" onClick = {e => props.searchRecipeByBody(e, setResults)}></button>
                    <button className="fingers" value="fingers" onClick = {e => props.searchRecipeByBody(e, setResults)}></button>
                    <button className="hands" value="hands" onClick = {e => props.searchRecipeByBody(e, setResults)}></button>
                    <button className="head" value="head" onClick = {e => props.searchRecipeByBody(e, setResults)}></button>
                    <button className="knee" value="knee" onClick = {e => props.searchRecipeByBody(e, setResults)}></button>
                    <button className="legs" value="legs" onClick = {e => props.searchRecipeByBody(e, setResults)}></button>
                    <button className="lips" value="lips" onClick = {e => props.searchRecipeByBody(e, setResults)}></button>
                    <button className="mouth" value="mouth" onClick = {e => props.searchRecipeByBody(e, setResults)}></button>
                    <button className="stomach" value="stomach" onClick = {e => props.searchRecipeByBody(e, setResults)}></button>
                    <button className="throat" value="throat" onClick = {e => props.searchRecipeByBody(e, setResults)}></button>
                    <button className="wrist" value="wrist" onClick = {e => props.searchRecipeByBody(e, setResults)}></button>
                </div>
                <p></p>
                <p className="suggestRecipe">Suggested Recipes</p> 
                <div className ="searchBar">
                    <img src = "logos/search.png"/>
                    <input type = "text" placeholder = "Search By Ailment" onChange = {e => props.searchRecipe(e, setResults)}/>
                </div> 
                <BrowseRecipe
                    results = {results}
                    getRecipe ={props.getRecipe}
                />

            </div>
            
        </>
    );
}
export default Register;