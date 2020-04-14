import React from "react";
import "./BrowseRecipe.css";

const BrowseRecipe = (props) => {
    var temp = props.results != undefined ? 
    props.results.sort((a, b) => (a.RecName > b.RecName) ? 1 : -1) 
    : [];
    const entries = temp.map((result, index) =>{
        return(
            <div key = {index} className = "entry">
                <p> <b>Ailment:</b> {result.Ailment}</p>
                <p> <b>Body Part:</b> {result.BodyPart}</p>
                <p> <b>Description:</b> {result.Description}</p>
                <p> <b>Recipe Name:</b> {result.RecName}</p>

            </div>
        );
    });
    return(
        <div className = "results">
            {entries}
        </div>
    );
}
export default BrowseRecipe;


