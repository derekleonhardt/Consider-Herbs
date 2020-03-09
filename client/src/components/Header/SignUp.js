import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Header } from 'semantic-ui-react'
import './SignUp.css';

const SignUp = (props) => {
    return (
        <div className= "background">
            <div className = "box">
                <h1 color='white'>Why Not Consider Herbs?</h1>
                <Form>
                    <Form.Input placeholder='email' />
                    <Form.Input placeholder='password' />
                    <Button.Group fluid>
                        <Button positive>Login</Button>
                        <Button.Or />
                        <Button positive>Sign Up</Button>
                    </Button.Group>
                </Form>
                
            </div>
        </div>
    )
};

export default SignUp;
