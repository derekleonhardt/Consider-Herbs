import React, {useState} from "react";
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
                (props.userRole == "guest") &&
                <div className = "NoAccount">
                    <p>Make an acccount to view more Glossary listings!</p>
                    <Auth0 className = "login">Login</Auth0>
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