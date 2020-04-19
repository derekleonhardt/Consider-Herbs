import React, {useState} from "react";
import "./BrowseRecipe.css";

const getRecipe = (id, setRecipeMethod)=> {
    fetch(`http://127.0.0.1:5000/api/db/recipe/id/`+id).then(
        (response)=>{
            (response.json().then(data =>{
                setRecipeMethod(data.data);
    }));
});
}


const BrowseRecipe = (props) => {
    var temp = props.results != undefined ? 
    props.results.sort((a, b) => (a.RecName > b.RecName) ? 1 : -1) 
    : [];
    //const [curRecipe, setCurRecipe] = useState({});
    //if(!curRecipe.Id)
        //getRecipe(curRecipe.Id, setCurRecipe); 

    const entries = temp.map((result, index) =>{
        return(
            <div key = {index} className = "entry">
                <p> <b>Body Part:</b> {result.BodyPart}</p>
                <p> <b>Recipe Name:</b> {result.RecName}</p>
                <p> <b>Ailment:</b> {result.Ailment}</p>
                <p> <b>Description:</b> {result.Description}</p>

                {/*
                curRecipe.Ingredients.map((Ingredient)=>{
                    // iterates through Ingredients
                    return(
                        <>
                            <p>{Ingredient.IngName}</p>
                            <p>{Ingredient.Amounut}</p>
                            <p>{Ingredient.Units}</p>
                        </>
                    );
                })*/
            }

                
               
                

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


