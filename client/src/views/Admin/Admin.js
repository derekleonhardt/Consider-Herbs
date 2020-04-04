import React, { useState } from 'react';
import GlossaryEdit from './../../components/GlossaryEdit';
import './Admin.css';
const Admin = (props) => {
    return(
        <div className = "admin">
            <GlossaryEdit {...props}/>
        </div>
    );
}
export default Admin;