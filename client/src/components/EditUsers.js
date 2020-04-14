import React, { useState } from 'react';
import './EditUsers.css';
import { set } from 'mongoose';
const getUsers = (props, setUserList) => {
        //get a list of users
        fetch(`https://${props.config.domain}/api/v2/users`,{
        headers: {authorization: "Bearer " + props.access.access_token}
        }).then(res => res.json().then(data => {
            setUserList(data);
            console.log(data);
        })).catch(rej=>console.log(rej));
}
const checkIfAdmin = (config, user, access,setUserRole) =>{
    //get the users role
    fetch(`https://${config.domain}/api/v2/users/${user.user_id}/roles`,{
      headers: {authorization: "Bearer " + access.access_token}
    }).then(res => res.json().then(data => {
        if(data.filter(role => role.name === "Admin").length > 0)
            setUserRole("Admin");
        else 
            setUserRole("Client");
    })).catch((reason) => {console.log(reason);return false});
}
const EditUsers = (props) => {
    const [userList, setUserList]  = useState(null);
    const [shownUser, setShownUser] = useState(null);
    const [userRole, setUserRole] = useState('Client');
    if(props.isAuthenticated && !userList){
        getUsers({...props}, setUserList);
    }
    var entries = [];
    if(userList){
        entries = userList.map((entry, index) => {
            return(
                <div key = {index} className = "editEntry" onClick = {() => {
                    setShownUser(entry);
                    checkIfAdmin(props.config, entry, props.access, setUserRole);
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
            (shownUser && props.isAdmin) &&
            <div className = "entryInfo">
                <h2> {shownUser.name}</h2> 
                <p><b>Email:</b> {shownUser.email}</p>
                <p><b>Role:</b> {userRole}</p>
            </div>
            }
            <div className = "entries">
                {entries}
            </div>
        </div>
    );
}
export default EditUsers;