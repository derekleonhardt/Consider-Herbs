import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './UserHome.css';
import {Form, Transition, Button, Icon, Grid, Comment, Segment, Sticky, Header} from 'semantic-ui-react';
import 'semantic-ui-react';

const UserHome = (props) => {
    const [links, setLinks] = useState(null);
    const [text, setText] = useState(null);
    const [images, setImages] = useState(null);
    const [products, setProducts] = useState(null);
    const [shownLinks, setShownLinks] = useState(null);
    const [shownText, setShownText] = useState(null);
    const [shownImages, setShownImages] = useState(null);
    const [shownProducts, setShownProducts] = useState(null);
    if(!links)
        props.getDbListings("links", "userHome", setLinks);
    if(!text)
        props.getDbListings("text", "userHome", setText);
    if(!images)
        props.getDbListings("images", "userHome", setImages);
    if(!products)
        props.getDbListings("products", "userHome", setProducts);
    if(links && !shownLinks){
        let format = links.filter(link => link.inUse);
        setShownLinks(format.map((link, index) =>{
            return(
                <div key = {index} className="adminLinks">
                    <h1>{link.name}</h1>
                    <embed src = {link.src} className="embedLink"></embed>
                    {
                        <p className="linkCaption">{link.caption}</p>
                    }
                </div>
            );
        }));
    }
    if(products && !shownProducts){
        let format = products.filter(product => product.inUse);
        setShownProducts(format.map((product, index) =>{
            return(
                <figure key = {index} className='figure'>
                    <h3 className="productName">{product.name}</h3>
                    <img src = {product.src} alt= {product.alt}/>
                    <figcaption>${product.price}</figcaption>
                    <figcaption>{product.caption}</figcaption>
                </figure>
            );
        }));
    }
    if(text && !shownText){
        let format = text.filter(txt => txt.inUse);
        setShownText(format.map((text, index) =>{
            return(
                <Grid.Column>
                    <div key = {index} className="addText">
                        <h3 className="textTitle">{text.title}</h3>
                        <p className="textTitle">{text.text}</p>
                    </div> 
                </Grid.Column> 
            );
        }));
    }
    if(images && !shownImages){
        let format = images.filter(img => img.inUse);
        setShownImages(format.map((image, index) =>{
            return(
                <div key = {index} className="img">
                    <div className='img2'>
                        <img src = {image.src}  alt={image.alt} className="embedImg"/>
                    </div>
                    <h2>{image.caption}</h2>
                </div>
            );
        }));
    }
    return(
        <div className="otherinspo">
            <div className="thanks1">
                <h1>Thank you for Considering Herbs, {props.user.name}! </h1>
                <h3>For more inspiration on how you can use herbs in every day life, take a look at these websites and announcements.</h3>
            </div>
        
            <div className="links">
                {shownLinks}
            </div>
            <div className="text">
                {shownText}
            </div>
            <div className="thanks">
                <h3 className="checkout">Take a look at some fun images!</h3>
            </div>
            <div className="imgContainer">
                {shownImages}
            </div>
            <div className="thanks">
                <h3 className="checkout">Check out these products I have been loving!</h3>
            </div>

            <div className = "products">
                {shownProducts}
            </div>
        </div>
    );
}
export default UserHome;