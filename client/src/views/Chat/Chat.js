import React, {useState} from 'react';
import logo from '../../assets/logo.svg';
import { Route, Switch, Redirect  } from 'react-router-dom';
import {Button , Form, TextArea, Segment, Header, ItemDescription } from 'semantic-ui-react'
import './Chat.css';
import Post from './Functions/Post.jsx'
import PostEditor from './Functions/PostEditor.js'
import 'semantic-ui-react';
let sub = "";

function Chat(props) {

const [posts, setPosts] = useState([]);

const updatePosts = (temp) => {
    setPosts(temp);
}
const Submission = (e) =>
{
    console.log(e.target.value);
    sub = e.target.value;
    console.log(sub);
}

const addPost = (e) =>
{
    setPosts([...posts, {
        id: posts.length,
        value: sub
    }])
    //const temp = posts.push(e.target.value);
    //updatePosts(temp);
    sub = '';
}
const postList = posts.map(posts => (
                  
    <Post key={posts.id} postBody={posts.value}/>

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
                <PostEditor sub={sub} addPost={addPost} Submission={Submission} input={props.input}/>
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