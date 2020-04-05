import React, { useState } from 'react';
import './GlossaryEdit.css';

const GlossaryEdit = (props) => {
    const [results, setResults] = useState([]); //holds array of  glossary content from database
    const [entryInfo, setEntryInfo] = useState(null);// holds value of selected glossary item
    const [typeEdit, setTypeEdit] = useState('Edit'); //holds the type of change that will be made to the glossary
    const [formReset, setFormReset] = useState('');
    const [messageStatus, setMessageStatus] = useState(''); //message to display when submitting form fails/ passes
    const [formContents, setFormContents] = useState({
        title: '',
        definition:'',
        usage:''
    });
    ///// Sets value for "Edit, Add, Delete" Array
    const commands = ['Edit','Add','Delete'];
    const options = commands.map((command,index) => {
        return(
            <option key = {index} value = {command}>{command}</option>
        );
    });
    ///////function to delete elements from glossary  /////////
    const submitDelete = async (formContents, display = true) => {
        if(!formContents){
            setMessageStatus("Please pick an entry to delete");
            return;
        }
        const response = await fetch(`http://127.0.0.1:5000/api/db/glossary/delete/${formContents.Title}`, {
          method: 'DELETE'
        });
        var res = (await response.json());
        if(res.success){
            if(display)
                setMessageStatus("Entry has been deleted");
            setEntryInfo(null);
        }
        else 
        if(display) 
            setMessageStatus("Error: Entry has not been deleted");
        props.defaultGlossary(setResults);
    }
    /////// function to add/ edit elements in glossary  ///////
    const submitEdit = async (formContents) => {
        if(!entryInfo && typeEdit == "Edit"){
            setMessageStatus("Please pick an entry to edit");
            return;
        }
        var updatedContents = formContents;
        if(typeEdit == "Edit"){
            updatedContents = {
                title: formContents.title.replace(/\s/g,'') != '' ? formContents.title : entryInfo.Title,
                definition: formContents.definition.replace(/\s/g,'') != '' ? formContents.definition : entryInfo.Definition,    
                usage: formContents.usage.replace(/\s/g,'') != '' ? formContents.usage : entryInfo.Usage
            };
            await submitDelete(entryInfo, false);
        }
        const response = await fetch(`http://127.0.0.1:5000/api/db/glossary/insert`,
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(updatedContents) // body data type must match "Content-Type" header
        });
        var res = (await response.json());
        if(res.success){
            typeEdit == "Add" ? setMessageStatus("Entry has been added") : setMessageStatus("Entry has been edited");
        }
        else 
            setMessageStatus("Error: Entry has not been added");
        props.defaultGlossary(setResults);
    }
    
    ///// Populating the glossary list with items
    if(results.length == 0) props.defaultGlossary(setResults);
    var temp = results.data != undefined ? results.data.sort((a, b) => (a.Title.toLowerCase() > b.Title.toLowerCase()) ? 1 : -1) : []; //set temp variable to the glossary results ONLY if the results variable is not empty 
    const entries = temp.map((result, index) =>{
        return(
            <div key = {index} className = "editEntry" onClick = {() => {setEntryInfo(result);}}>
                {result.Title}
            </div>
        );
    });
  return(
        <div className = "glossaryEdit"> {/*Holds all glossary editing content */}
            <h2 className = "glossaryTitle">Edit Glossary</h2>
            <form className = "infoEdit"> {/*holds everything but the interactive glossary list */}
                <select onChange = {e => { 
                        //when the type of edit (add edit delete) changes, set the state and reset the form
                        setTypeEdit(e.target.value);
                        setFormReset('reset');
                        setMessageStatus('');
                        setEntryInfo(null);
                    }} className = "typeEdit">
                    {options}
                </select>
                {
                    entryInfo && typeEdit != "Add" &&
                    <>
                    {/* When the editing or deleting you must be able to see the listing available to take action on, this displays the info from those listings */}
                        <div className = "entryInfo">
                            <h2> {entryInfo.Title}</h2> 
                            <p><b>Definition:</b> {entryInfo.Definition}</p>
                            <p><b>Usage:</b> {entryInfo.Usage}</p>
                        </div>
                        
                    </>
                }
                {
                    (typeEdit == "Edit" || typeEdit == "Add") &&
                    <>
                    {/* When editing/ adding you must be able to submit the new content that you want to display, that content will be written in the following inputs */}
                        <label>New Title</label>
                        <input type = "text" placeholder = "Title" onChange = {e => setFormContents({
                            //This is the info that will be used on submital of this form
                            title: e.target.value,
                            definition: formContents.definition,
                            usage: formContents.usage
                        })}/>
                        <label>New Definition</label>
                        <input type = "text" placeholder = "Usage" onChange = {e => setFormContents({
                            title: formContents.title,
                            definition: formContents.definition,
                            usage: e.target.value
                        })}/>
                        <label>New Usage</label>
                        <input type = "text" placeholder = "Definition" onChange = {e => setFormContents({
                            title: formContents.title,
                            definition: e.target.value,
                            usage: formContents.usage
                        })}/>
                        <button onClick = {e => {
                            e.preventDefault();
                            submitEdit(formContents);
                        }} className = "submitEdit">Submit</button>
                    </>
                }
                {
                    typeEdit == "Delete" &&
                    <button onClick = {e => {
                        e.preventDefault();
                        submitDelete(entryInfo);
                    }}>Delete this Entry</button>
                }
                {messageStatus != '' && <p className = "messageStatus">{messageStatus}</p>}
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