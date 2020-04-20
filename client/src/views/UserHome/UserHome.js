import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './UserHome.css';

const UserHome = (props) => {
    const [links, setLinks] = useState(null);
    const [text, setText] = useState(null);
    const [images, setImages] = useState(null);
    const [shownLinks, setShownLinks] = useState(null);
    const [shownText, setShownText] = useState(null);
    const [shownImages, setShownImages] = useState(null);
    if(!links)
        props.getDbListings("links", "userHome", setLinks);
    if(!text)
        props.getDbListings("text", "userHome", setText);
    if(!images)
        props.getDbListings("images", "userHome", setImages);
    if(links && !shownLinks){
        let format = links.filter(link => link.inUse);
        setShownLinks(format.map((link, index) =>{
            return(
                <div key = {index}>
                    <h3>{link.name}</h3>
                    <embed src = {link.src}></embed>
                    {
                        link.caption &&
                        <p>{link.caption}</p>
                    }
                </div>
            );
        }));
    }
    if(text && !shownText){
        let format = text.filter(txt => txt.inUse);
        setShownText(format.map((text, index) =>{
            return(
                <div key = {index}>
                    <h3>{text.title}</h3>
                    <p>{text.text}</p>
                </div> 
            );
        }));
    }
    if(images && !shownImages){
        let format = images.filter(img => img.inUse);
        setShownImages(format.map((image, index) =>{
            return(
                <figure key = {index}>
                    <img src = {image.src} alt= {image.alt}/>
                    <figcaption>{image.caption}</figcaption>
                </figure> 
            );
        }));
    }
    console.log(shownLinks);
    return(
        <div className="otherinspo">
            <div className="thanks">
                <h1>Thank you for Considering Herbs, {props.user.name}! </h1>
                <h3>For more inspiration on how you can use herbs in every day life, take a look at these websites.</h3>
            </div>
        
            <div className="links">
                {shownLinks}
            </div>
            <div className="text">
                {shownText}
            </div>
            <div className="img">
                {shownImages}
            </div>
            <div className="thanks">
                <h3 className="checkout">Check out these products I have been loving!</h3>
            </div>

        
        </div>
    );
}
export default UserHome;