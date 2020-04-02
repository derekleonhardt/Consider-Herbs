import React from 'react';
import { Link } from 'react-router-dom';
import './UserHome.css';




const UserHome = (props) => {
    return(
        <>
        <div className="otherinspo">
            <h1 classname="welcome">Thank you for Considering Herbs. </h1>
        
            <div className="sites">   
                <embed className="web" src="https://learningherbs.com/"/>
                <embed className="web" src="https://permies.com/"/>
                <embed className="web" src="https://www.healthline.com/"/>
            </div>
            <div className="links">
                <a href="https://learningherbs.com/">Click Here to Visit</a>
                <a href="https://permies.com/">Click Here to Visit</a>
                <a href="https://www.healthline.com/">Click Here to Visit</a>
            </div>
            

            <h1 className="checkout">Check out these products I have been loving!</h1>
            <div className="products"></div>
                <a href="https://www.gaiaherbs.com/products/lemon-balm-certified-organic?gclid=Cj0KCQjwmpb0BRCBARIsAG7y4zZAnIcwull57clYBWB-GkoKikNXuksxMgahOcXcPMTctBmD0kSCA4caAk-NEALw_wcB">
                    <embed className="product" src="https://cdn.shopify.com/s/files/1/0058/0252/4783/products/Gaia-Herbs-Lemon-Balm_LA443001_101-0419_PDP_1200x.png?v=1569587677"/>
                </a>
                <a href="https://www.etsy.com/listing/201556262/culinary-lavender?gpla=1&gao=1&&utm_source=google&utm_medium=cpc&utm_campaign=shopping_us_e-home_and_living-food_and_drink-herbs_and_spices_and_seasonings-herbs_and_spices&utm_custom1=714e146d-ef6a-4aa2-b780-63a8f4015ef1&utm_content=go_1844702805_75381303731_346364747985_pla-306107311649_c__201556262&utm_custom2=1844702805&gclid=Cj0KCQjwmpb0BRCBARIsAG7y4zbWWGhOzC6ABtW4qzad_o0Td9EO7Rq0i5-ZR91qSIyBX2a4qHqV_84aAnGZEALw_wcB">
                    <embed className="product" src="https://i.etsystatic.com/9308182/r/il/9ef534/1330708956/il_1588xN.1330708956_50ip.jpg"/>
                </a>
                <a href="theteaspot.com/products/meditative-mind-loose-white-tea?gclid=Cj0KCQjwmpb0BRCBARIsAG7y4zb5OhXbcLh1uDlFSgh1hOOqfVZTg_hc_Y5p3MSpvHaoRxt3GmF4rsQaAlIfEALw_wcB">
                    <embed className="product" src="https://cdn.shopify.com/s/files/1/0092/4424/6052/products/organic-meditative-mind-sachet-gable-x_3_1024x1024@2x.jpg?v=1568062966"></embed>
                </a>
        </div>
        
        
        </>
    );
}
export default UserHome;