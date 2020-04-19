import React, { useState } from 'react';
import './EditUsers.css';
const getUsers = (props, setUserList, setDefaultUserList) => {
        //get a list of users
        fetch(`https://${props.config.domain}/api/v2/users`,{
        headers: {authorization: "Bearer " + props.access.access_token}
        }).then(res => res.json().then(data => {
            setUserList(data);
            setDefaultUserList(data);
        })).catch(rej=>console.log(rej));
}
const EditUsers = (props) => {
    const [userList, setUserList]  = useState(null);
    const [shownUser, setShownUser] = useState(null);
    const [defaultUserList, setDefaultUserList] = useState([]);
    const [warningMessage, setWarning] = useState(false);
    const [newUserRole, setNewRole] = useState("admin");
    const [shownRole, setShownRole] = useState("");
    const [confirmChange, setConfirm] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    let userTypes = ["Admin" , "Subscriber", "Premium"];
    userTypes = userTypes.map((userType, index) =>{
        return(
            <option key = {index} value = {userType.toLowerCase()}>{userType}</option>
        );
    });

    if(props.isAuthenticated && !userList){
        getUsers({...props}, setUserList, setDefaultUserList);
    }
    var entries = [];
    if(userList){
        entries = userList.map((entry, index) => {
            return(
                <div key = {index} className = "editEntry" onClick = {() => {
                    setShownUser(entry);
                    props.getAuthUserRole(entry.user_id, props.config, setShownRole, props.access);
                    setConfirm(false);
                    setWarning(false);
                    setSubmitted(false);
                }}>
                    <a href = "#">
                        {entry.name}
                    </a>
                </div>
            );
        });
    }
    return(
        
        <div className = "adminPanel editUsers">
            <h2 className = "adminHeader">Manage Users</h2>
            {
            shownUser &&
            <div className = "entryInfo userEntry">
                <h2> {shownUser.name}</h2> 
                <p><b>Email:</b> {shownUser.email}</p>
                <p><b>Role:</b> {shownRole}</p>
                <select type = "select" 
                className = "typeEdit"
                onChange = {e => {
                    setNewRole(e.target.value);
                }}>
                    {userTypes}
                </select>
                
                <button 
                className = {`editSubmit ${confirmChange ? " hidden" : ""}`}
                onClick = {e => {
                    e.preventDefault()
                    if(!warningMessage){
                        setWarning(true);
                        setConfirm(true);
                        setSubmitted(false);
                    }
                }}>Submit</button>
                {
                    warningMessage &&
                    <>
                        <p>Are you sure you want to change this users role to {newUserRole} ?</p>
                        <button
                        className = "editSubmit" 
                        onClick ={e =>{
                            e.preventDefault();
                            setConfirm(false);
                            setWarning(false);
                            setSubmitted(true);
                            //delete previous role
                            props.deleteAuthUserRole(shownUser.user_id, [shownRole], props.config, props.access);
                            //add new role
                            props.setAuthUserRole(shownUser.user_id,newUserRole,props.config, props.access);
                            //update role
                            setShownRole(newUserRole);
                        }}>
                            Yes
                        </button>
                    </>
                }
                {
                    submitted &&
                    <p>Submitted!</p>
                }
            </div>
            }
            <input type = "text" 
            placeholder = "Search"
            onChange = {e => {
                setUserList(defaultUserList.filter(user => user.name.toLowerCase().includes(e.target.value.toLowerCase())));
            }}/>
            <div className = "entries">
                {entries}
            </div>
        </div>
    );
}
export default EditUsers;