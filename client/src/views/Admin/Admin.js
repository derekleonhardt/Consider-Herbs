import React, { useState } from 'react';
import GlossaryEdit from './../../components/GlossaryEdit';
import EditUsers from './../../components/EditUsers';
import './Admin.css';
const Admin = (props) => {
    return(
        <div className = "admin">
            <GlossaryEdit {...props}/>
            <EditUsers {...props}/>
        </div>
    );
}
export default Admin;