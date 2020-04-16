import React, {useState, useReducer} from 'react';
import logo from '../../assets/logo.svg';
import { Route, Switch, Redirect  } from 'react-router-dom';
import {Button , Form, TextArea, Segment, Header, ItemDescription } from 'semantic-ui-react'
import './Chat.css';
import Post from './Functions/Post.jsx'
import PostEditor from './Functions/PostEditor.js'
import 'semantic-ui-react';
import Youtube from 'react-youtube';
let sub = "";
let title ="";
let user ="";
let vid ="";

function Chat(props) {

const [posts, setPosts] = useState([]);

const updatePosts = (temp) => {
    setPosts(temp);
}
const videoLink = (e) =>
{
    console.log(e.target.value);
    vid = e.target.value;
    console.log(vid);
}
const Submission = (e) =>
{
    console.log(e.target.value);
    sub = e.target.value;
    console.log(sub);
}
const ChangeTitle = (e) =>
{
    console.log(e.target.value);
    title = e.target.value;
    console.log(title);
}

const addPost = (e) =>
{
    let vidID = "";
    if(vid !=="")
    {
        var array = vid.split("=");
        vidID = array[1];
        console.log(vidID);
    }
    setPosts([...posts, {
        id: posts.length,
        Head: title, 
        Name: user,
        value: sub,
        video: vidID
    }])
    //const temp = posts.push(e.target.value);
    //updatePosts(temp);
    sub = ''
    title ="";
}
const postList = posts.map(posts => (
                  
    <Post key={posts.id} postBy={posts.Name} postTitle ={posts.Head} postBody={posts.value} postVideo={posts.video}/>

));
    return (
        <div>
            <div className= "post-body">
                {
                    postList
                }
            </div>
            <div className="post-editor">
                <div>
                <PostEditor sub={sub} videoLink={videoLink} ChangeTitle={ChangeTitle} addPost={addPost} Submission={Submission} input={props.input}/>
                </div>
            </div>
        </div>
    );
}
/*



 <Segment>
                    <Form>
                        <Form.Field>
                            <label>Write a respone</label>
                            <TextArea placeholder= 'Write your response here.' name ={sub} value={name}  onChange={Submission} />
                            <Button color='green' value={sub} onClick={addPost}  floated='right'>Submit</Button>
                         </Form.Field>
                    </Form>
                    </Segment>

<PostEditor sub={sub} addPost={addPost} Submission={Submission} input={props.input}/>

<div className="panel panel-default post-editor">
                <div className="panel-body">
                    <textarea className="form-control post-editor-input"/>
                    <button className= "btn btn-success post-editor-button">Post</button>
                </div>
            </div>
*/

export default Chat
;