import React, { useState } from 'react';
import GlossaryEdit from './../../components/GlossaryEdit';
import BookingAdmin from './../../components/BookingAdmin';

import './Admin.css';
const Admin = (props) => {
    return(
        <div className = "admin">
            <GlossaryEdit {...props}/>
            <BookingAdmin/>
        </div>
    );
}
export default Admin;