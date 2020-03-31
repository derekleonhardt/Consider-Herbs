import React, {useState} from "react";
import "./Browse.css"

const Browse = (props) => {
    
    return(
        <div className = "glossary">
            <h1>
                Herb Glossary
            </h1>
            <input type = "text"></input>
            <div className = "results">
                {props.herbList}
            </div>
        </div>
    );
}

export default Browse;