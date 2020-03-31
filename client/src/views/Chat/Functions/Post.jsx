import React from 'react';
import {Button , Form, TextArea, Segment, Header } from 'semantic-ui-react'
import 'semantic-ui-react';
function Post(props)
{
    return(

        <Segment>
            {props.postBody}
        </Segment>
    );
}
export default Post
