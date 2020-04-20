import React, {useState, useEffect} from 'react';
import {Form, Transition, Button, Icon, Grid, Input, TextArea} from 'semantic-ui-react';
import 'semantic-ui-react';
import { useAuth0 } from "../../react-auth0-spa";
import { Link, useHistory } from 'react-router-dom';
import JoditEditor from "jodit-react";
import Chat from './Chat.js'
import './Edit.css';

const writePost = (title, content, url, user, history) => {
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
    }).then((res)=>{
        history.push("/Chat")
    })
}

const editPost = (id, title, content, url, history) => {

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
        history.push("Chat/"+id);
    });;
}

const readPostContent = (setMethod,id, setTitleMethod, setUrlMethod, setContentMethod) => {
    fetch(`http://127.0.0.1:5000/api/db/post/`+id).then(
            (response)=>{
                (response.json().then(data =>{
                    setMethod(data.data);
                    setTitleMethod(data.data.title);
                    setUrlMethod(data.data.url);
                    setContentMethod(data.data.content);
            }))
    });
}

const Edit = (props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [url, setUrl] = useState("");
    const [curPost, setCurPost] = useState({});
    const { isLoading, user, loginWithRedirect, logout} = useAuth0();
    const history = useHistory();
    if(props.match.params.pid){
        if(!curPost || !curPost.Id)
            readPostContent(setCurPost, props.match.params.pid, setTitle, setUrl, setContent);
    return(
        <>
        <p></p>
        <Grid className="grid3" centered>
            <Grid.Row centered>
                <h1 className="writeTitle" >Edit Your Post!</h1>
            </Grid.Row>

            <Grid.Row centered>
                <Grid.Column width={9} centered>
                    <div className="createPost">
                        <Form>
                            <Input  className='writeInput' size='large' fluid value={title} onChange = {e => setTitle(e.target.value)} placeholder='Title'/>
                            <Input  className='writeInput' size='large' fluid value={url} onChange = {e => setUrl(e.target.value)} placeholder='Youtube Url'/>
                            <JoditEditor
                            minHeight={400}
                            value={content}
                            tabIndex={1}
		                    onBlur={newContent => setContent(newContent)}
                            />
                        </Form>
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Link to="/Chat"><Button  size='massive' classname='writeButton' positive onClick={()=>{editPost(props.match.params.pid, title, content, url, history)}}>Post</Button></Link>
            </Grid.Row>
            <Grid.Row>

            </Grid.Row>
        </Grid>
        </>
    )
    }
    else
    return(
        <>
        <p></p>
        <Grid className="grid3" centered>
            <Grid.Row centered>
                <h1 className="writeTitle" >Create Your Post!</h1>
            </Grid.Row>

            <Grid.Row centered>
                <Grid.Column width={9} centered>
                    <div className="createPost">
                        <Form>
                            <Input  className='writeInput' size='large' fluid value={title} onChange = {e => setTitle(e.target.value)} placeholder='Title'/>
                            <Input  className='writeInput' size='large' fluid value={url} onChange = {e => setUrl(e.target.value)} placeholder='Youtube Url'/>
                            <JoditEditor
                            minHeight={400}
                            value={content}
                            tabIndex={1}
		                    onBlur={newContent => setContent(newContent)}
                            />
                        </Form>
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Button  size='massive' classname='writeButton' positive onClick={()=>{writePost(title, content, url, user, history)}}>Post</Button>
            </Grid.Row>
            <Grid.Row>

            </Grid.Row>
        </Grid>
        </>
    )
}

export default Edit;
