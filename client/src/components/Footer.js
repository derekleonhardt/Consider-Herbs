import React from 'react';
import "./Footer.css";

const Footer = () => {
    return (
        <div className = "footer">
            <div className = "contactInfo">
                <ul>
                    <li>
                        <h4>Contact Info:</h4>
                    </li>
                    <li>
                        Email: dee@considerherbs.com
                    </li>
                    <li>
                        Phone: 123 420 6969
                    </li>
                    <li>
                        Facebook:
                    </li>
                    <li>
                        Instagram: consider.herbs
                    </li>
                </ul>
            </div>
            <div className = "disclaimer">
                <img className = "ce-logo" src={ "/logos/considerHerbsLogo.png" } alt="React logo" />
                <p>
                    Disclaimer: The information presented herein by Consider Herbs is intended for educational purposes only. These statements have not been evaluated by the FDA and are not intended to diagnose, cure, treat or prevent disease. Individual results may vary, and before using any supplements, it is always advisable to consult with your own healthcare provider.
                </p>
            </div>
        </div>
    );
}
export default Footer;