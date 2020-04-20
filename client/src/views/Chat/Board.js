import React, {useState} from 'react';
import logo from '../../assets/logo.svg';
import {BrowserRouter ,Route, Switch, Redirect, Link  } from 'react-router-dom';
import {Button, Form, Divider, Segment, Header, ItemDescription, Grid } from 'semantic-ui-react'
import './Chat.css';
import Chat from './Chat.js'
import Post from './Functions/Post.jsx'
import 'semantic-ui-react';

function Board(props)
{
    //const [posts, setPosts] = useState([]);
    //const [replies, setReplies] = useState([]);
    //const [postID, setPostID] = useState();

    const currentPost = () =>
    {
       // <Post key={posts.id} postBy={posts.Name} postTitle ={posts.Head} postBody={posts.value}/>
    }
    const nextPost = (e) =>
    {
        /*
         if(posts.length < postID)
        {
        postID = posts.id + 1;
        }
        */
           
    }
    const previousPost = (e) =>
    {
        /*
         if(postID > 0)
        {
        postID = posts.id - 1;
        }
        */

    }
   return(
        <div className="Post-Make">
         <Link to="/Chat/Post">
            <div class="ui top attached button">
                <Header as='h3'>Create a Post</Header>
            </div>
        </Link> 
            <div class="ui attached segment">
                
            </div> 
            <div class="ui two bottom attached buttons">
                <div class="ui button">Previous</div>
                <div class="ui button">Next</div>
           </div>
           </div>
   )
}
/*
<Link to="/Chat/Post" component={Chat}>Test</Link>/>
*/
export default Board;