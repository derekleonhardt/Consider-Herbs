import React, {useState, useEffect} from 'react';
import {Form, Transition, Button, Icon, Grid, Input, TextArea} from 'semantic-ui-react';
import 'semantic-ui-react';
import { useAuth0 } from "../../react-auth0-spa";
import { Link } from 'react-router-dom';
import Chat from './Chat.js'
import './Edit.css';

const writePost = (title, content, url, user) => {
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
        email:user.email,
        url:url
})
    })
}

const editPost = (id, title, content, url, user) => {

    fetch(`http://127.0.0.1:5000/api/db/post/edit/`+id,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title:title,
        content:content,
        url:url
})
    }).then((res)=>{
    });;
}

const Edit = (props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [url, setUrl] = useState("");
    const { isLoading, user, loginWithRedirect, logout} = useAuth0();
    if(props.match.params.pid)
    return(
        <>
        <p></p>
        <Grid className="grid3" centered>
            <Grid.Row centered>
                <h1 className="writeTitle" >Edit Your Post!</h1>
            </Grid.Row>

            <Grid.Row centered>
                <Grid.Column width={9} centered textAlign='center'>
                    <div className="createPost">
                        <Form>
                            <Input  className='writeInput' size='large' fluid onChange = {e => setTitle(e.target.value)} placeholder='Title'/>
                            <TextArea className='textInput' style={{ minHeight: 250}} onChange = {e => setContent(e.target.value)} placeholder='Body'/>
                        </Form>
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Link to="/Chat"><Button  size='massive' classname='writeButton' positive onClick={()=>{editPost(props.match.params.pid, title, content, url, user)}}>Post</Button></Link>
            </Grid.Row>
            <Grid.Row>

            </Grid.Row>
        </Grid>
        </>
    )
    else
    return(
        <>
        <p></p>
        <Grid className="grid3" centered>
            <Grid.Row centered>
                <h1 className="writeTitle" >Create Your Post!</h1>
            </Grid.Row>

            <Grid.Row centered>
                <Grid.Column width={9} centered textAlign='center'>
                    <div className="createPost">
                        <Form>
                            <Input  className='writeInput' size='large' fluid onChange = {e => setTitle(e.target.value)} placeholder='Title'/>
                            <Input  className='writeInput' size='large' fluid onChange = {e => setUrl(e.target.value)} placeholder='Url'/>
                            <TextArea className='textInput' style={{ minHeight: 250}} onChange = {e => setContent(e.target.value)} placeholder='Body'/>
                        </Form>
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Link to="/Chat"><Button  size='massive' classname='writeButton' positive onClick={()=>{writePost(title, content, url, user)}}>Post</Button></Link>
            </Grid.Row>
            <Grid.Row>

            </Grid.Row>
        </Grid>
        </>
    )
}

export default Edit;
