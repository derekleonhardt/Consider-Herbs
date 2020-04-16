import React from 'react';
import {Button , Form, TextArea, Segment, Header } from 'semantic-ui-react'
import 'semantic-ui-react';
function PostEditor(props)
{
    
    return(
    <Segment>
        <Form>
            <Form.Field>
                <label> Title </label>
                <input placeholder= 'Insert Title here.' value={props.input} onChange={props.ChangeTitle}/>
                <label>Write a respone</label>
                <TextArea placeholder= 'Write your response here.'  value={props.input}  onChange={props.Submission} />
                <label> Youtube Link </label>
                <input placeholder= 'Insert youtube link here.' value={props.input} onChange={props.videoLink}/>
                <Button color='green' value={props.input} onClick={props.addPost}  floated='right'>Submit</Button>
            </Form.Field>
        </Form>
    </Segment>
    );
}
export default PostEditor
