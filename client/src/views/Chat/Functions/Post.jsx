import React from 'react';
import {Button , Form, TextArea, Segment, Header } from 'semantic-ui-react'
import 'semantic-ui-react';
import Youtube from 'react-youtube';
import YouTube from 'react-youtube';
function Post(props)
{
    console.log(props.postVideo);
    const opts = {
        height: '390',
        width: '640',
        PlayerVars:{
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        }
    };
   // let now = new Date();
    return(
        <Segment>
            <h3 class="ui large header">{props.postTitle}</h3>
            <h3 class="ui small header">By {props.postName}</h3>
            {props.postBody}
            <Segment>
                <YouTube videoId={props.postVideo} opts={opts}/>
            </Segment>
        </Segment>
    );
}
export default Post
