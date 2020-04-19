import React, {useState, useEffect} from 'react';
import {Form, Transition, Button, Icon, Grid, Comment, Segment, Sticky, Header} from 'semantic-ui-react';
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
            <Grid centered className='grid4'>
                <Grid.Row>
                    <div className="postTitle">
                        <h1>{curPost.title}</h1>
                        <p>by: {curPost.name}</p>
                    </div>
                </Grid.Row>
                <Grid.Row>
                    <div className="postContent">
                        <p>URL: {curPost.url}</p>
                        <p>{curPost.content}</p>

                        <Comment.Group size="mini">
                            <Header as='h5'dividing>Comments</Header>
                            {
                                comments.map((comment)=>{
                                    return(
                                        <>
                                            <Comment>
                                                <Comment.Content>
                                                    <Comment.Author>{comment.name}</Comment.Author>
                                                    <Comment.Text>{comment.content}</Comment.Text>
                                                </Comment.Content>
                                            </Comment>
                                        </>
                                    );
                                })
                            }
                            <Form reply>
                                <Form.TextArea value={commentIn} onChange={(event)=>{setCommentIn(event.target.value)}} />
                                <Button size='small' content='Add Reply' labelPosition='left' icon='edit' positive onClick={()=>{writeComment(curPost.Id,commentIn,user,setComments); setCommentIn("");}} />
                            </Form>
                            <p></p>
                            {(user && user.email == curPost.email)?<Link to={"/Chat"}><Button size='small' negative onClick={()=>{deletePost(curPost.Id, refreshList)}}>Delete Post</Button></Link>:<></>}
                            <p></p>
                            <Link to="/Chat"><Button size='small'>Back To All Posts</Button></Link>
                        </Comment.Group>

                    </div>
                </Grid.Row>
                <Grid.Row></Grid.Row>
            </Grid>
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
        <Grid className="grid2" columns='equal' conlums={2}>
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
