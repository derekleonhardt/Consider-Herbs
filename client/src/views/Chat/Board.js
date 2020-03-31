import React, {useState} from 'react';
import logo from '../../assets/logo.svg';
import {BrowserRouter ,Route, Switch, Redirect, Link  } from 'react-router-dom';
import {Button, Form, Divider, Segment, Header, ItemDescription, Grid } from 'semantic-ui-react'
import './Chat.css';
import Chat from './Chat.js'
import 'semantic-ui-react';

function Board(props)
{
const goToPost = (e) =>
{
    console.log('ttt');
    return(  
        <Link to="/Chat/Post" component={Chat}>Test</Link>
    )
};
   return(
        <div>
         <Link to="/Chat/Post">
            <Button>
            <Segment>
                <Header as='h3'>Test</Header>
            </Segment>
            </Button>
        </Link> 
        </div>
   )
}
/*
<Link to="/Chat/Post" component={Chat}>Test</Link>/>
*/
export default Board;