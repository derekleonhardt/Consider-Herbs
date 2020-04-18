import React, {useState, useEffect} from 'react';
import {Form, Transition, Button, Icon, Grid, Comment, Segment, Sticky} from 'semantic-ui-react';
import 'semantic-ui-react';
import { useAuth0 } from "../../react-auth0-spa";
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import './Chat.css';

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

const writeComment = (pid, content, user, setMethod) => {
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
    const {pid} = useParams();
    const [comments, setComments] = useState([]);
    const [commentIn, setCommentIn] = useState("");
    //if(!user)
    //return(<><h1>you need to sign in!</h1></>)
    //else
    //console.log(pid);
    if(pid)
    {
        if(!curPost || !curPost.Id || curPost.Id != pid)
            readPost(setCurPost, pid,setComments);
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
            <h4>write comment below</h4>
            <p></p>
            <textarea value={commentIn} onChange={(event)=>{setCommentIn(event.target.value)}}></textarea>
            <p>
            <button onClick={()=>{writeComment(curPost.Id,commentIn,user,setComments); setCommentIn("");}}>Comment</button>
            </p>
            
            {(user && user.email == curPost.email)?<Link to={"/Edit/"+curPost.Id}><button>Edit</button></Link>:<></>}
            {(user && user.email == curPost.email)?<Link to={"/Chat"}><button onClick={()=>{deletePost(curPost.Id, refreshList)}}>Delete</button></Link>:<></>}
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
        <p></p>
        <Grid className="grid" columns='equal' conlums={2}>
            <Grid.Row centered>
                <h1 className="title" >Join The Discussion Below</h1>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={10}>
                    <div className="postRow">
                        <h1 className="postsTitle">Recent Posts ({posts.length})</h1>
                        <div className="segmentGroup">
                            <Segment.Group>
                                {
                                    posts.map(post=>{
                                        return(
                                            <>
                                                <Segment textAlign='center'>
                                                        <h3><a href={"/Chat/"+post.Id} className='titleLink'>{post.title}</a></h3>
                                                        <p>{post.name}</p>
                                                
                                                </Segment>
                                            </>
                                        )
                                    })
                                }
                            </Segment.Group>
                        </div>
                    </div>
                </Grid.Column>

                <Grid.Column textAlign="center">
                    <div className="buttonRow">
                        <Sticky offset={25}>
                            <Link to="/Write">
                                <Button  positive size="massive" className="postButton" centered>Write Your Own Post</Button>
                            </Link>
                        </Sticky>
                    
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </>
    )
    }
}

export default Chat;
