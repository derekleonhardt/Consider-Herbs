import React, {useState} from "react";
import BrowseResults from "../../components/BrowseResults";
import "./Browse.css"

const Browse = (props) => {
  const[results, setResults] = useState([]);
    if(results.length == 0) props.defaultGlossary(setResults);
    return(
        <div className = "glossary">
            <h1 className = "glossaryTitle">
                Herb Glossary
            </h1>
            <div className ="searchBar">
                <img src = "logos/search.png"/>
                <input type = "text" placeholder = "Search For Herbs" onChange = {e => props.searchGlossary(e, setResults)}/>
            </div> 
            <BrowseResults
                results = {results.data}
            />
        </div>
    );
}

export default Browse;