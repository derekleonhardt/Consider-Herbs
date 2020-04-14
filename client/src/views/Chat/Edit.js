import React, {useState, useEffect} from 'react';
import {Form, Transition, Button, Icon, Grid} from 'semantic-ui-react';
import 'semantic-ui-react';
import { useAuth0 } from "../../react-auth0-spa";
import { Link } from 'react-router-dom';

const writePost = (title, content, user) => {
    if(!user) {
        alert("you need to sign in!");
        return;
    }
    fetch(`http://127.0.0.1:5000/api/db/post/write`,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title:title,
        content:content,
        name:user.name,
        username:user.nickname,
        email:user.email
})
    });
}
const Edit = (props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { isLoading, user, loginWithRedirect, logout} = useAuth0();
    return(
        <>
        title: <input onChange = {e => setTitle(e.target.value)}/><br></br>
        content: <textarea onChange = {e => setContent(e.target.value)} rows="8" col="50"/><br></br>
        <Link to="/Chat"><button onClick={()=>{writePost(title, content, user)}}>write</button></Link>
        </>
    )
}

export default Edit;
