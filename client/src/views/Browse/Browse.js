import React, {useState, useEffect} from "react";
import "./Browse.css"
const search = (e, props) =>{
    ///Hosung, try to fix this and get setHerbList to return a list of the search results 
    /*props.setHerbList(fetch(`api/db/recipe/search/${e.target.value}`)
    .then((response) => {
        return response.json();
    },()=>{
        console.log('rejected');
    }));
    console.log(props.herbList);*/
}
const Browse = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    // props.setHerbList({
    //     "data": {
    //         "Title": "Arnica",
    //         "Definition": "Arnica is an herb that grows mainly in Siberia and central Europe, as well as temperate climates in North America. The flowers of the plant are used in medicine.",
    //         "Usage": "People take arnica by mouth for sore mouth and throat, pain such as pain after surgery or wisdom tooth removal, insect bites, painful and swollen veins near the surface of the skin (superficial phlebitis), bruising, muscle pain, vision problems due to diabetes, stroke, and for causing abortions. Arnica is applied to the skin for pain and swelling associated with bruises, aches, and sprains. It is also applied to the skin for insect bites, arthritis, muscle and cartilage pain, chapped lips, and acne. In foods, arnica is a flavor ingredient in beverages, frozen dairy desserts, candy, baked goods, gelatins, and puddings. In manufacturing, arnica is used in hair tonics and anti-dandruff preparations. The oil is used in perfumes and cosmetics."
    //     }
    // });
    var items;
    useEffect(() =>{
        
        // items = props.herbList.forEach(item => {
        //     return(
        //         <figure className = "item">
                    
        //         </figure>
        //     );
        // });
    },[props]);
    return(
        <div className = "glossary">
            <h1 className = "glossaryTitle">
                Herb Glossary
            </h1>
            <div className ="searchBar">
                <img src = "logos/search.png"/>
                <input type = "text" value = "Search For Herbs" onChange = {search}/>
            </div> 
            <div className = "results">
            </div>
        </div>
    );
}

export default Browse;