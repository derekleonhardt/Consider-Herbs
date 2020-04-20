import React, {useState} from "react";
import "./BrowseRecipe.css";

var test =0;


const BrowseRecipe = (props) => {
    console.log(props.results);
    var temp = props.results? 
    props.results.sort((a, b) => (a.RecName > b.RecName) ? 1 : -1) 
    : [];

    const[results, setResults] = useState([]);


    const entries = temp.map((result, index) =>{
        return(
            <div key = {index} className = "entry">
                <p> <b>Body Part:</b> {result.BodyPart}</p>
                <p> <b>Recipe Name:</b> {result.RecName}</p>
                <p> <b>Ailment:</b> {result.Ailment}</p>
                <p> <b>Description:</b> {result.Description}</p>
                <p> <b>Ingredients</b></p>
                <ul>
                {result.Ingredients?<>
                {
                    result.Ingredients.map(ingredient=>{
                        return(
                        <li key={ingredient.IngName}>{ingredient.IngName} {ingredient.Amounut} {ingredient.Units}</li>
                        )
                    })
                }
                </>:<></>}
                </ul>
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


