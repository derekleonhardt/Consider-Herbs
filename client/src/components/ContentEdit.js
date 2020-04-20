import React, { useState } from 'react';
import HomeSub from './HomeSub';
import './ContentEdit.css';

const ContentEdit = (props) => {
    const pages = ["Home (Subscriber)","Home (Guest)", "Browse", "Remedy", "Book"];
    const [pageToEdit, setPage] = useState(pages[0]);
    let pageOptions = pages.map((page, index) => {
        return(
            <option key = {index} value = {page}>
                {page}
            </option>
        );
    });
    let ShownPage = HomeSub;
    {
        switch(pageToEdit){
            case pages[0]:
                ShownPage = HomeSub;
                break;
        }
    }
    return(
        <div className = "contentEdit adminPanel">
            <h2 className = "adminHeader">Manage Content</h2>

            <label>Page to be edited</label>
            <select onChange = {e => {
                // setPage(e.target.value);
            }}>
                {pageOptions}
            </select>
            <ShownPage 
            getDbListings = {props.getDbListings}
            updateDbListings = {props.updateDbListings}
            deleteDbListings = {props.deleteDbListings}
            addDbListings = {props.addDbListings}
            />
        </div>
    );
}
export default ContentEdit;