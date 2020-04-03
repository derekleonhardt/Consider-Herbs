import React, {useState} from "react";
import BrowseResults from "../../components/BrowseResults";
import "./Browse.css"
const search = (e, setResults) =>{
    if (e.target.value.replace(/\s/g,'') != ''){
        fetch(`http://127.0.0.1:5000/api/db/glossary/search/${e.target.value}`).then(
            (response)=>{
                (response.json().then(data =>{
                    setResults(data);
                    console.log(data);
                }))
        });
    }
}
const Browse = () => {
    const[results, setResults] = useState([]);
    return(
        <div className = "glossary">
            <h1 className = "glossaryTitle">
                Herb Glossary
            </h1>
            <div className ="searchBar">
                <img src = "logos/search.png"/>
                <input type = "text" placeholder = "Search For Herbs" onChange = {e => search(e,setResults)}/>
            </div> 
            <BrowseResults
                results = {results.data}
            />
        </div>
    );
}

export default Browse;