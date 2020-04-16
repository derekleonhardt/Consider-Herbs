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


/*
import React, {useState, useEffect} from 'react';
import {Form, Transition, Button, Icon, Grid} from 'semantic-ui-react';
import 'semantic-ui-react';
import { useAuth0 } from "../../react-auth0-spa";
import { Link } from 'react-router-dom';

const listPost = (setMethod) => {
    fetch(`http://127.0.0.1:5000/api/db/post/`).then(
            (response)=>{
                (response.json().then(data =>{
                    setMethod(data.data);
            }))
    });
}

const readPost = (setMethod,id) => {
    fetch(`http://127.0.0.1:5000/api/db/post/`+id).then(
            (response)=>{
                (response.json().then(data =>{
                    setMethod(data.data);
            }))
    });
}

const deletePost = (id, refreshMethod) => {
    fetch(`http://127.0.0.1:5000/api/db/post/delete/`+id,{
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        Id:id
})
    }).then((res)=>{
        refreshMethod();
    });;
}



const Chat = (props) => {
    const [posts, setPosts] = useState([]);
    const [curPost, setCurPost] = useState({});
    const { isLoading, user, loginWithRedirect, logout} = useAuth0();
    const refreshList = () => {
        listPost(setPosts);
    }
    //if(!user)
    //return(<><h1>you need to sign in!</h1></>)
    //else
    if(props.match.params.pid)
    {
        if(!curPost || !curPost.Id || curPost.Id != props.match.params.pid)
            readPost(setCurPost, props.match.params.pid);
        if(curPost && curPost.Id)
        return (
        <>
            <h2>{curPost.title}</h2>
            <p>{curPost.name}</p>
            <p>{curPost.content}</p>
            <h3>Comment</h3>
            <Link to={"/Edit/"+curPost.Id}><button>Edit</button></Link>
            <Link to={"/Chat"}><button onClick={()=>{deletePost(curPost.Id, refreshList)}}>Delete</button></Link>
            <Link to="/Chat"><p>back to list</p></Link>
            
        </>
        );
        else
        return (
        <>
            post not found
        </>
        )
    }
    else{
        if(posts.length == 0)
            refreshList();
    return (
        <>
        <h2>Posts ({posts.length} posts)</h2>
        {
            posts.map(post=>{
                return(
                    <>
                        <Link to={"/Chat/"+post.Id}><p>{post.Id} {post.title} {post.name}</p></Link>
                    </>
                )
            })
        }
        <Link to="/Write">
        <button >write post</button>
        </Link>
        </>
    )
    }
}

export default Chat;


;
*/