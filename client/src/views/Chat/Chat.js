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

const readPost = (setMethod,id,setCommentMethod) => {
    fetch(`http://127.0.0.1:5000/api/db/post/`+id).then(
            (response)=>{
                (response.json().then(data =>{
                    setMethod(data.data);
                    loadComment(setCommentMethod, id);
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

const writeComment = (pid, content, user) => {
    if(!user) {
        alert("you need to sign in!");
        return;
    }
    fetch(`http://127.0.0.1:5000/api/db/post/`+pid+`/reply/write`,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title:"",
        content:content,
        name:user.name,
        username:user.nickname,
        email:user.email
})
    }).then((res)=>{
        loadComment(setMethod,pid);
    })
}

const loadComment = (setMethod, pid) => {
    fetch(`http://127.0.0.1:5000/api/db/post/`+pid+`/reply`).then(
            (response)=>{
                (response.json().then(data =>{
                    setMethod(data.data);
                    console.log(data.data);
            }))
    });
}
const Chat = (props) => {
    const [posts, setPosts] = useState([]);
    const [curPost, setCurPost] = useState({});
    const { isLoading, user, loginWithRedirect, logout} = useAuth0();
    const refreshList = () => {
        listPost(setPosts);
    }
    const [comments, setComments] = useState([]);
    const [commentIn, setCommentIn] = useState("");
    //if(!user)
    //return(<><h1>you need to sign in!</h1></>)
    //else
    if(props.match.params.pid)
    {
        if(!curPost || !curPost.Id || curPost.Id != props.match.params.pid)
            readPost(setCurPost, props.match.params.pid,setComments);
        if(curPost && curPost.Id)
        return (
        <>
            <h2>{curPost.title}</h2>
            <p>{curPost.name}</p>
            <p>{curPost.content}</p>
            <h3>Comments</h3>
            {
                comments.map((comment)=>{
                    return(
                        <>
                            <p>
                                {comment.name}
                                <p></p>
                                {comment.content}
                            </p>
                        </>
                    );
                })
            }
            <h4>Content:</h4>
            <p></p>
            <textarea value={commentIn} onChange={(event)=>{setCommentIn(event.target.value)}}></textarea>
            <p></p>
            <button onClick={()=>{writeComment(curPost.Id,commentIn,user,setComments)}}>Comment</button>

            
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
