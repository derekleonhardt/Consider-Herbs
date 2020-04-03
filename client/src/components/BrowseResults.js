import React from "react";
import "./BrowseResults.css";

const BrowseResults = (props) => {
    var temp = props.results != undefined ? props.results : [];
    console.log(temp);
    const entries = temp.map((result, index) =>{
        return(
            <div key = {index} className = "entry">
                <h2>{result.Title}</h2>
                
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