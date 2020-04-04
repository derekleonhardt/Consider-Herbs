import React, { useState } from 'react';
import './GlossaryEdit.css';

const GlossaryEdit = (props) => {
    const [results, setResults] = useState([]);
    const [entryInfo, setEntryInfo] = useState(null);
    const [typeEdit, setTypeEdit] = useState('Edit');
    const [formReset, setFormReset] = useState('');
    const commands = ['Edit','Add','Delete'];
    const options = commands.map((command,index) => {
        return(
            <option key = {index} value = {command}>{command}</option>
        );
    });
    const formContents = {
        Title: '',
        Definition:'',
        Usage:''
    };
    props.defaultGlossary(setResults);
    var temp = results.data != undefined ? results.data : [];
    const entries = temp.map((result, index) =>{
        return(
            <div key = {index} className = "editEntry" onClick = {() => {setEntryInfo(result); console.log(result)}}>
                {result.Title}
            </div>
        );
    });
    return(
        <div className = "glossaryEdit">
            <form className = "infoEdit" type = {formReset}>
                <select onChange = {e => setTypeEdit(e.target.value)}>
                    {options}
                </select>
                {
                    entryInfo && typeEdit != "Add" &&
                    <>
                        <div className = "entryInfo">
                            <h2> {entryInfo.Title}</h2> 
                            <p><b>Definition:</b> {entryInfo.Definition}</p>
                            <p><b>Usage:</b> {entryInfo.Usage}</p>
                        </div>
                        {
                            typeEdit == "Edit" &&
                            <>
                                <label>New Title</label>
                                <input type = "text" placeholder = {entryInfo.Title} onChange = {e => formContents.Title = e.target.value}/>
                                <label>New Definition</label>
                                <input type = "text" placeholder = "Usage" onChange = {e => formContents.Usage = e.target.value}/>
                                <label>New Usage</label>
                                <input type = "text" placeholder = "Definition" onChange = {e => formContents.Definition = e.target.value}/>
                                <button onClick = {e => {
                                    e.preventDefault();
                                }} className = "submitEdit">Submit</button>
                            </>
                        }
                    </>
                }
                {
                    typeEdit == "Delete" &&
                    <button onClick = {e => {
                        e.preventDefault();
                        
                    }}>Delete this Entry</button>
                }

            </form>
            { 
                (typeEdit == "Edit" || typeEdit == "Delete") &&
                <div className = "entries">
                    {entries}
                </div>
            }
        </div>
    );
}
export default GlossaryEdit;