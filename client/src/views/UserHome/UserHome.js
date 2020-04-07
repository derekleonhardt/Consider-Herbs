import React from 'react';
import { Link } from 'react-router-dom';
import './UserHome.css';

const UserHome = (props) => {
    return(
        <div className="otherinspo">
            <div className="thanks">
                <h1>Thank you for Considering Herbs, {props.user.name}! </h1>
                <h3>For more inspiration on how you can use herbs in every day life, take a look at these websites.</h3>
            </div>
        
            <div className="sites">   
                <embed className="web" src="https://learningherbs.com/"/>
                <embed className="web" src="https://permies.com/"/>
                <embed className="web" src="https://www.healthline.com/"/>
            </div>

            <div className="links">
                <a className="linky" href="https://learningherbs.com/">Click Here to Visit</a>
                <a className="linky" href="https://permies.com/">Click Here to Visit</a>
                <a className="linky" href="https://www.healthline.com/">Click Here to Visit</a>
            </div>
            
            <div className="spacer"></div>

            <div className="thanks">
                <h3 className="checkout">Check out these products I have been loving!</h3>
            </div>

            
            <div className="products">
                
                <a className="trying"  href="https://www.etsy.com/listing/201556262/culinary-lavender?gpla=1&gao=1&&utm_source=google&utm_medium=cpc&utm_campaign=shopping_us_e-home_and_living-food_and_drink-herbs_and_spices_and_seasonings-herbs_and_spices&utm_custom1=714e146d-ef6a-4aa2-b780-63a8f4015ef1&utm_content=go_1844702805_75381303731_346364747985_pla-306107311649_c__201556262&utm_custom2=1844702805&gclid=Cj0KCQjwmpb0BRCBARIsAG7y4zbWWGhOzC6ABtW4qzad_o0Td9EO7Rq0i5-ZR91qSIyBX2a4qHqV_84aAnGZEALw_wcB">
                    <img className="product" src="https://i.etsystatic.com/9308182/r/il/9ef534/1330708956/il_1588xN.1330708956_50ip.jpg"/>
                </a>
                <a className="trying" href="https://www.gaiaherbs.com/products/lemon-balm-certified-organic?gclid=Cj0KCQjwmpb0BRCBARIsAG7y4zZAnIcwull57clYBWB-GkoKikNXuksxMgahOcXcPMTctBmD0kSCA4caAk-NEALw_wcB">
                    <img className="product" src="https://cdn.shopify.com/s/files/1/0058/0252/4783/products/Gaia-Herbs-Lemon-Balm_LA443001_101-0419_PDP_1200x.png?v=1569587677"/>
                </a>
                <a className="trying"  href="https://www.theteaspot.com/products/meditative-mind-loose-white-tea?_pos=1&_sid=fa4572946&_ss=r">
                    <img className="product" src="https://cdn.shopify.com/s/files/1/0092/4424/6052/products/organic-meditative-mind-sachet-gable-x_3_1024x1024@2x.jpg?v=1568062966"/>
                </a>
            </div>
        
        </div>
    );
}
export default UserHome;