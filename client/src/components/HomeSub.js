import React, { useState } from 'react';

const contentLinking = (homeLink, getDbListings, contentType, linkListings, setHomeLink, setAboutEntry, setTypeEntry, setLinkListings, setSubmittal) => {
    if(!homeLink)
        (getDbListings(contentType, "userHome", setHomeLink));
    else if(!linkListings && homeLink[0]){
        let list = homeLink.map((link, index) =>{
            return(
                <div key = {index} className = "editEntry editContentEntry" onClick = {() => {
                    setAboutEntry(link);
                    setTypeEntry(contentType);
                    setSubmittal({
                        name: link.name ? link.name : null,
                        src: link.src ? link.src : null,
                        alt: link.alt ? link.alt : null,
                        title: link.title ? link.title : null,
                        caption: link.caption ? link.caption : null,
                        text: link.text ? link.text : null,
                        inUse: link.inUse ? link.inUse : null,
                        id: link.id ? link.id : null,
                        page: link.page ? link.page : null
                    });
                }}>
                    <p>
                    {
                        (contentType === "Text") &&
                        link.title
                    }
                    {
                        (contentType === "Images") &&
                        link.alt
                    }
                    {
                        (contentType === "Links") &&
                        link.name
                    }
                    </p>
                    <p>{contentType}</p>
                </div>
            );
        });        
        setLinkListings(list);
    }
}

const HomeSub = (props) => {
    const [aboutEntry, setAboutEntry] = useState(null);
    const [typeEntry, setTypeEntry] = useState(null);
    const [homeImages, setHomeImages] = useState(null);
    const [imageListings, setImageListings] = useState(null);
    const [homeText, setHomeText] = useState(null);
    const [textListings, setTextListings] = useState(null);
    const [homeLink, setHomeLink] = useState(null);
    const [linkListings, setLinkListings] = useState(null);
    const [submittal, setSubmittal] = useState({});

    //initializing content DB info for text, links, and images
    contentLinking(homeLink, props.getDbListings, "Links", linkListings, setHomeLink, setAboutEntry, setTypeEntry, setLinkListings, setSubmittal);
    contentLinking(homeImages, props.getDbListings, "Images", imageListings, setHomeImages, setAboutEntry, setTypeEntry, setImageListings, setSubmittal);
    contentLinking(homeText, props.getDbListings, "Text", textListings, setHomeText, setAboutEntry, setTypeEntry, setTextListings, setSubmittal);

    
    return(
        <div className = "pageChoice">
                <h3>About Section</h3>
                {
                    aboutEntry &&
                    <div className = "entryInfo contentEntryInfo">
                    {/* This div shows up when a listing is clicked. */}
                        {
                            (typeEntry == "Text") &&
                            <>  
                                <label><b>Title:</b> </label>
                                <input type = "text" defaultValue = {submittal.title} className = "submitInput" onChange = {e =>{
                                    let submit = submittal;
                                    submit.title = e.target.value;
                                    setSubmittal(submit);
                                }}
                                />
                                <label><b>Text:</b> </label>
                                <textarea cols = "" className = "submitInput" defaultValue = {submittal.text}
                                onChange = {e =>{
                                    let submit = submittal;
                                    submit.text = e.target.value;
                                    setSubmittal(submit);
                                }}
                                />
                            </>
                        }
                        {
                            (typeEntry == "Images") &&
                            <>
                                <label><b>Alt Text:</b> </label>
                                <input type = "text" defaultValue = {submittal.alt} className = "submitInput" onChange = {e =>{
                                    let submit = submittal;
                                    submit.alt = e.target.value;
                                    setSubmittal(submit);
                                }}
                                />
                                <label><b>Src:</b> </label>
                                <input type = "text" defaultValue = {submittal.src} className = "submitInput" onChange = {e =>{
                                    let submit = submittal;
                                    submit.src = e.target.value;
                                    setSubmittal(submit);
                                }}
                                />
                                <label><b>Caption:</b> </label>
                                <input type = "text" defaultValue = {submittal.caption} className = "submitInput" onChange = {e =>{
                                    let submit = submittal;
                                    submit.caption = e.target.value;
                                    setSubmittal(submit);
                                }}
                                />
                            </>
                        }
                        {
                            (typeEntry == "Links") &&
                            <>
                                <label><b>Name:</b> </label>
                                <input type = "text" defaultValue = {submittal.name} className = "submitInput" onChange = {e =>{
                                    let submit = submittal;
                                    submit.name = e.target.value;
                                    setSubmittal(submit);
                                }}
                                />
                                <label><b>Src:</b> </label>
                                <input type = "text" defaultValue = {submittal.src} className = "submitInput" onChange = {e =>{
                                    let submit = submittal;
                                    submit.src = e.target.value;
                                    setSubmittal(submit);
                                }}
                                />
                                <label><b>Caption:</b> </label>
                                <input type = "text" defaultValue = {submittal.caption} className = "submitInput" onChange = {e =>{
                                    let submit = submittal;
                                    submit.caption = e.target.value;
                                    setSubmittal(submit);
                                }}
                                />
                                
                            </>
                        }
                        {
                            aboutEntry.inUse &&
                            <p><b>Position on page:</b> {aboutEntry.inUse}</p>
                        }
                        {
                            !aboutEntry.inUse &&
                            <p><b>Not currently in use</b></p>
                        }
                        <label><b>Show on Page?:</b> </label>
                        <input type = "checkbox" defaultValue = {submittal.caption} className = "submitInput" onChange = {e =>{
                            let submit = submittal;
                            submit.inUse = e.target.checked ? true : false;
                            setSubmittal(submit);
                        }}
                        />

                        <button onClick = {e => {
                            e.preventDefault();
                            props.updateDbListings("text", submittal);
                            setAboutEntry(null);
                            contentLinking(homeText, props.getDbListings, "Text", textListings, setHomeText, setAboutEntry, setTypeEntry, setTextListings, setSubmittal);
                        }}>Submit</button>
                        <button onClick = {e => {
                            e.preventDefault();
                            props.deleteDbListings(submittal.id);
                            setAboutEntry(null);
                            contentLinking(homeText, props.getDbListings, "Text", textListings, setHomeText, setAboutEntry, setTypeEntry, setTextListings, setSubmittal);
                        }}>
                            Delete
                        </button>
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
                    {
                        linkListings &&
                        linkListings
                    }
                </div>
        </div>
    );
}
export default HomeSub;