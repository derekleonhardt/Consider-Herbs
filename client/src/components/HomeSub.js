import React, { useState } from 'react';

//making this function is literallyone of the stupidest things ive every done omg
//like fuck bro
const contentLinking = (homeLink, getDbListings, contentType, linkListings, setHomeLink, setAboutEntry, setTypeEntry, setLinkListings, setSubmittal, setCounter, counter, setAdd) => {
    if(!homeLink)
        (getDbListings(contentType, "userHome", setHomeLink));
    else if(!linkListings && homeLink[0]){
        let list = homeLink.map((link, index) =>{
            return(
                <div key = {index} className = "editEntry editContentEntry" onClick = {() => {
                    setAboutEntry(link);
                    setCounter(counter++);
                    setAdd(false);
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
                        ((contentType === "Links")||(contentType === "Products") ) &&
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
    const [homeProducts, setHomeProducts] = useState(null);
    const [productListings, setProductListings] = useState(null);
    const [submittal, setSubmittal] = useState({});
    const [counter, setCounter] = useState(0);
    const [add, setAdd] = useState(false);
    const defaultSubmit = {
        name: null,
        src: null,
        alt: null,
        title: null,
        caption: null,
        text: null,
        inUse: null,
        id: null,
        page: "userHome",
        price: 0
    };

    //initializing content DB info for text, links, and images
    contentLinking(homeLink, props.getDbListings, "Links", linkListings, setHomeLink, setAboutEntry, setTypeEntry, setLinkListings, setSubmittal, setCounter, counter, setAdd);
    contentLinking(homeImages, props.getDbListings, "Images", imageListings, setHomeImages, setAboutEntry, setTypeEntry, setImageListings, setSubmittal, setCounter, counter, setAdd);
    contentLinking(homeText, props.getDbListings, "Text", textListings, setHomeText, setAboutEntry, setTypeEntry, setTextListings, setSubmittal, setCounter, counter, setAdd);
    contentLinking(homeProducts, props.getDbListings, "Products", productListings, setHomeProducts, setAboutEntry, setTypeEntry, setProductListings, setSubmittal, setCounter, counter, setAdd);
    return(
        <div className = "pageChoice">
                <h3>About Section</h3>
                {
                    aboutEntry &&
                    <div className = "entryInfo contentEntryInfo" key = {counter}>
                    {/* This div shows up when a listing is clicked. */}
                    {
                        add &&
                        <>
                            <h3>Add Content</h3>
                            <select onChange = {e => {
                                e.preventDefault();
                                setTypeEntry(e.target.value);
                                setAboutEntry({});
                                setSubmittal(defaultSubmit);
                            }}>
                                <option value ="Text">text</option>
                                <option value ="Images">image</option>
                                <option value ="Links">link</option>
                                <option value ="Products">product</option>
                            </select>

                        </>
                    }
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
                                <textarea className = "submitInput" defaultValue = {submittal.text}
                                onChange = {e =>{
                                    let submit = submittal;
                                    submit.text = e.target.value;
                                    setSubmittal(submit);
                                }}
                                />
                            </>
                        }
                        {
                            ((typeEntry === "Images") || (typeEntry === "Products")) &&
                            <>
                                <label><b>Alt Text:</b> </label>
                                <input type = "text" defaultValue = {submittal.alt} className = "submitInput" onChange = {e =>{
                                    let submit = submittal;
                                    submit.alt = e.target.value;
                                    setSubmittal(submit);
                                }}
                                />
                            </>
                        }
                        {
                            ((typeEntry === "Links") || (typeEntry === "Products")) &&
                            <>
                                <label><b>Name:</b> </label>
                                <input type = "text" defaultValue = {submittal.name} className = "submitInput" onChange = {e =>{
                                    let submit = submittal;
                                    submit.name = e.target.value;
                                    setSubmittal(submit);
                                }}
                                />                                
                            </>
                        }
                        {
                            (typeEntry === "Products") &&
                            <>
                                <label><b>Price:</b> </label>
                                <input type = "number" defaultValue = {submittal.price} className = "submitInput" onChange = {e =>{
                                    let submit = submittal;
                                    submit.price = e.target.value;
                                    setSubmittal(submit);
                                }}
                                />
                            </>
                        }
                        {
                            (typeEntry != "Text") &&
                            <>
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
                        {
                            !add &&
                            <div className = "contentButtons">
                                <button onClick = {e => {
                                    e.preventDefault();
                                    props.updateDbListings(typeEntry, submittal);
                                    setAboutEntry(null);
                                }}>Submit</button>
                                <button onClick = {e => {
                                    e.preventDefault();
                                    props.deleteDbListings(typeEntry,submittal.id)
                                    setAboutEntry(null);
                                    
                                }}>
                                    Delete
                                </button>
                            </div>
                        }
                        {
                            add &&
                            <button onClick = {e => {
                            e.preventDefault();
                            props.addDbListings(typeEntry,submittal);
                            setAboutEntry(null);
                            setAdd(false);
                            setSubmittal(defaultSubmit);
                            }}>Add</button>

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
                    {
                        linkListings &&
                        linkListings
                    }
                    {
                        productListings &&
                        productListings
                    }
                </div>
                <button onClick = {e => {
                    e.preventDefault();
                    setTypeEntry("Text");
                    setAboutEntry({});
                    setCounter(counter+1);
                    setSubmittal(defaultSubmit);
                    setAdd(true);
                    
                }}>Add New Listing</button>
        </div>
    );
}
export default HomeSub;