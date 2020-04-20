import React from "react";
import "./BrowseResults.css";
import 'semantic-ui-react';
import {Modal, Button} from 'semantic-ui-react';

const BrowseResults = (props) => {
    var temp = props.results != undefined ? 
    props.results.sort((a, b) => (a.Title.toLowerCase() > b.Title.toLowerCase()) ? 1 : -1) 
    : [];
    const entries = temp.map((result, index) =>{
        return(
            <div key = {index} className = "entry">
                <Modal size='small'  trigger={<h2 className="resultTitle">{result.Title}</h2>}>
                    <Modal.Header>{result.Title}</Modal.Header>
                    <Modal.Content>
                        <p> <b>Definition:</b> {result.Definition}</p>
                        <p> <b>Usage:</b> {result.Usage}</p>
                    </Modal.Content>
                </Modal>
                <p className="tester"> <b>Definition:</b> {result.Definition}</p>
                <p> <b>Usage:</b> {result.Usage}</p>
            </div>
        );
    });
    return(
        <div className = "results">
            {entries}
        </div>
    );
}
export default BrowseResults;