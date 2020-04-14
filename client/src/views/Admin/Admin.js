import React, { useState } from 'react';
import GlossaryEdit from './../../components/GlossaryEdit';
import EditUsers from './../../components/EditUsers';
import BookingAdmin from './../../components/BookingAdmin';

import './Admin.css';
const Admin = (props) => {
    return(
        <div className = "admin">
            <div className = "adminCol">
                <GlossaryEdit {...props}/>
            </div>
            <div className = "adminCol">
                <EditUsers {...props}/>
                <BookingAdmin/>
            </div>
        </div>
    );
}
export default Admin;