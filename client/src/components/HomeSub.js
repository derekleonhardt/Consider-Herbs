import React, { useState } from 'react';

const HomeSub = (props) => {
    const [aboutEntry, setAboutEntry] = useState(null);
    const [typeEntry, setTypeEntry] = useState(null);
    const [homeImages, setHomeImages] = useState(null);
    const [imageListings, setImageListings] = useState(null);
    const [homeText, setHomeText] = useState(null);
    const [textListings, setTextListings] = useState(null);
    if(!homeImages)
        (props.getDbListings("images", "userHome", setHomeImages));
    else if(!imageListings && homeImages[0]){
        console.log(homeImages)
        let list = homeImages.map((image, index) =>{
            return(
                <div className = "editEntry contentEntry" onClick = {() => {
                    setAboutEntry(image);
                    setTypeEntry("image");
                }}>
                    <p>{image.alt}</p>
                    <p>Image</p>
                </div>
            );
        });        
        setImageListings(list);
    }
    if(!homeText)
        (props.getDbListings("text", "userHome", setHomeText));
    else if(!textListings && homeText[0]){
        let list = homeText.map((text, index) =>{
            return(
                <div className = "editEntry contentEntry" onClick = {() => {
                    setAboutEntry(text);
                    setTypeEntry("text");
                }}>
                    <p>{text.title}</p>
                    <p>Text</p>
                </div>
            );
        });        
        setTextListings(list);
    }
    return(
        <div className = "">
                <h3>About Section</h3>
                {
                    aboutEntry &&
                    <div className = "entryInfo">
                        {
                            (typeEntry == "text") &&
                            <>
                                <h2> {aboutEntry.title}</h2> 
                                <p><b>Text:</b> {aboutEntry.text}</p>
                                {
                                    aboutEntry.inUse &&
                                    <p><b>Position on page:</b> {aboutEntry.inUse}</p>
                                }
                                {
                                    !aboutEntry.inUse &&
                                    <p><b>Not currently in use</b></p>
                                }
                            </>
                        }
                        {
                            (typeEntry == "image") &&
                            <>
                                <p><b>Alt Text:</b> {aboutEntry.alt}</p>
                                <p><b>Src:</b> {aboutEntry.src}</p>
                                <p><b>Caption:</b> {aboutEntry.caption}</p>
                                {
                                    aboutEntry.inUse &&
                                    <p><b>Position on page:</b> {aboutEntry.inUse}</p>
                                }
                                {
                                    !aboutEntry.inUse &&
                                    <p><b>Not currently in use</b></p>
                                }
                            </>
                        }
                    </div>
                }
                <div className= "entries contentEntry">
                    {
                        imageListings && 
                        imageListings
                    }
                    {
                        textListings &&
                        textListings
                    }
                </div>
        </div>
    );
}
export default HomeSub;