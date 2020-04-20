import React, { useState } from 'react';
import HomeSub from './HomeSub';
import './ContentEdit.css';

const ContentEdit = (props) => {
    return(
        <div className = "contentEdit adminPanel">
            <h2 className = "adminHeader">Manage Content</h2>
            <HomeSub 
            getDbListings = {props.getDbListings}
            updateDbListings = {props.updateDbListings}
            deleteDbListings = {props.deleteDbListings}
            addDbListings = {props.addDbListings}
            />
        </div>
    );
}
export default ContentEdit;