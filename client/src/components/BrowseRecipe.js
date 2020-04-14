import React from "react";
import "./BrowseRecipe.css";

const BrowseRecipe = (props) => {
    var temp = props.results != undefined ? 
    props.results.sort((a, b) => (a.RecName > b.RecName) ? 1 : -1) 
    : [];
    const entries = temp.map((result, index) =>{
        return(
            <div key = {index} className = "entry">
                <h2>{result.RecName}</h2>
                <p> <b>Ailment:</b> {result.Ailment}</p>
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