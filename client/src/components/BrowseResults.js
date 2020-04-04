import React from "react";
import "./BrowseResults.css";

const BrowseResults = (props) => {
    var temp = props.results != undefined ? props.results : [];
    const entries = temp.map((result, index) =>{
        return(
            <div key = {index} className = "entry">
                <h2>{result.Title}</h2>
                <p> <b>Definition:</b> {result.Definition}</p>
                <p> <b>Usage:</b> {result.Usage}</p>
            </div>
        );
    });
    return(
        <div className = "results">
            {entries}
        </div>
    );
}
export default BrowseResults;