import React, {useState} from "react";
import "./BrowseRecipe.css";

var test = 0;

const getRecipe = (id) => {
    fetch(`http://127.0.0.1:5000/api/db/recipe/id/`+id).then(
            (response)=>{
                (response.json().then(data =>{
                    data.data.Ingredients.map((ingredient,index)=>{

                        console.log(ingredient.IngName);
                        console.log(ingredient.Amounut);
                        console.log(ingredient.Units);
                    })
            }))
    });
  }

const BrowseRecipe = (props) => {
    var temp = props.results != undefined ? 
    props.results.sort((a, b) => (a.RecName > b.RecName) ? 1 : -1) 
    : [];


    

    const entries = temp.map((result, index) =>{
        return(
            <div key = {index} className = "entry">
                <p> <b>Body Part:</b> {result.BodyPart}</p>
                <p> <b>Recipe Name:</b> {result.RecName}</p>
                <p> <b>Ailment:</b> {result.Ailment}</p>
                <p> <b>Description:</b> {result.Description}</p>
                <p>tests{getRecipe(result.Id)}</p>


                

                
               
                

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


