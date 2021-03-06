import React, { useState } from 'react';
import GlossaryEdit from './../../components/GlossaryEdit';
import EditUsers from './../../components/EditUsers';
import ContentEdit from './../../components/ContentEdit';
import BookingAdmin from './../../components/BookingAdmin';


import './Admin.css';
const Admin = (props) => {
    return(
        <div className = "admin">
            <div className = "adminCol">
                <GlossaryEdit {...props}/>
                <ContentEdit {...props}/>
            </div>
            <div className = "adminCol">
                {
                    props.access &&
                    <EditUsers {...props}/>
                }
                <BookingAdmin/>
            </div>
        </div>
    );
}
export default Admin;