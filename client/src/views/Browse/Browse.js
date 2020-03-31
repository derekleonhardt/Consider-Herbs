import React, {useState, useEffect} from "react";
import "./Browse.css"

const Browse = (props) => {
    var items;
    useEffect(() =>{
        items = props.herbList.map(item => {
            item = (
                <figure className = "item">
                    
                </figure>
            );
        });
    },[props]);
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