import React, {useState} from "react";
import {Button} from 'semantic-ui-react';
import 'semantic-ui-react';
import BrowseResults from "../../components/BrowseResults";
import Auth0 from "./../../components/auth0";
import "./Browse.css"

const Browse = (props) => {
  const[results, setResults] = useState([]);
    if(results.length == 0) props.defaultGlossary(setResults);
    if (results.length > 3 && props.userRole == "guest"){
        setResults(results.slice(0,3));
    }
    return(
        <div className = "glossary">
            <h1 className = "glossaryTitle">
                Herb Glossary
            </h1>
            {
                (props.userRole === "guest" || props.role === "subscriber") &&
                <div className = "NoAccount">
                <p>Make a Premium acccount to view this content!</p>
                <Button positive  size="huge" className="button">Become A Premium Member</Button>
                </div>
            }
            {
                (props.userRole != "guest") &&
                <div className ="searchBar">
                    <img src = "logos/search.png"/>
                    <input type = "text" placeholder = "Search For Herbs" onChange = {e => props.searchGlossary(e, setResults)}/>
                </div> 
            }
            <BrowseResults
                results = {results}
            />
        </div>
    );
}

export default Browse;