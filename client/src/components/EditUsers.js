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
const submitNewRole = (shownUser, newUserRole) =>{
    //setUserRole from props here
    console.log(shownUser);
}
const EditUsers = (props) => {
    const [userList, setUserList]  = useState(null);
    const [shownUser, setShownUser] = useState(null);
    const [defaultUserList, setDefaultUserList] = useState([]);
    const [warningMessage, setWarning] = useState(false);
    const [newUserRole, setNewRole] = useState("Guest");
    let userTypes = ["Guest","Admin" , "Subscribed", "Premium Subscription"];
    userTypes = userTypes.map((userType, index) =>{
        return(
            <option key = {index} value = {userType}>{userType}</option>
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
            <h2>View Users</h2>
            {
            shownUser &&
            <div className = "entryInfo">
                <h2> {shownUser.name}</h2> 
                <p><b>Email:</b> {shownUser.email}</p>
                <p><b>Role:</b> {props.userRole}</p>
                <select type = "select" onChange = {e => {
                    setNewRole(e.target.value);
                    console.log(e.target.value);
                }}>
                    {userTypes}
                </select>
                
                <button onClick = {e => {
                    e.preventDefault()
                    if(!warningMessage)
                        setWarning(true);
                }}>Submit</button>
                {
                    warningMessage &&
                    <>
                        <p>Are you sure you want to change this users role to {newUserRole} ?</p>
                        <button onClick ={e =>{
                            e.preventDefault();
                            submitNewRole(shownUser, newUserRole);
                        }}>
                            Yes
                        </button>
                    </>
                }
            </div>
            }
            <input type = "text" onChange = {e => {
                setUserList(defaultUserList.filter(user => user.name.toLowerCase().includes(e.target.value.toLowerCase())));
            }}/>
            <div className = "entries">
                {entries}
            </div>
        </div>
    );
}
export default EditUsers;