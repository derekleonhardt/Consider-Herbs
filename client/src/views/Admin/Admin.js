import React, { useState } from 'react';
import './Admin.css';
const Admin = (props) => {
    const [typeEdit, setTypeEdit] = useState('Edit');
    const [newName, setNewName] = useState('');
    const commands = ['Edit','Add','Delete'];
    const [result, setResult] = useState('');
    const options = commands.map((command,index) => {
        return(
            <option key = {index} value = {command}>{command}</option>
        );
    });
    
    return(
        <>
            <form className = "infoEdit">
                <select onChange = { e => setTypeEdit(e.target.value)}>
                    {options}
                </select>
                {(typeEdit == 'Edit' || typeEdit == 'Delete') && 
                <>
                <input 
                placeholder = "Search" 
                onChange = {(e) =>{
                    var temp;
                    fetch(`http://127.0.0.1:5000/api/db/recipe/search/${e.target.value}`).then(
                        (response)=>{
                            (response.json().then(data =>{
                                props.setHerbList(data);
                                console.log(props.herbList);
                            }))
                        });
                }}
                type = "text"/>
                </>}
                {(typeEdit == 'Add' || typeEdit == 'Edit') &&
                 <input type = "text"
                placeholder = "Name"></input>}
                {props.herbList != [] && <p>{props.herbList[0]}</p>}
            </form>
        </>
    );
}
export default Admin;