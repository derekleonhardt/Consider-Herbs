import React, { useState } from 'react';
import './BookingAdmin.css';
const bookingEvents = (setMethod) => {
    fetch(`http://127.0.0.1:5000/api/db/booking/admin/`).then(
            (response)=>{
                (response.json().then(data =>{
                    setMethod(data.data);
            }))
    });
}
const confirmBooking = (bid, array, setMethod) => {
    var newarr = [];
    array.map(d=>{
        if(d.Id != bid)
            newarr.push(d);
    });
    setMethod(newarr);
    fetch(`http://127.0.0.1:5000/api/db/booking/admin/confirm`,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({id:bid})
    });
}
const BookingAdmin = (props) => {
    const [events, setEvents] = useState([]);
    if(events.length == 0)
        bookingEvents(setEvents);
  return(
        <div className = "glossaryEdit"> {/*Holds all glossary editing content */}
            <h2 className = "glossaryTitle">Confirm Booking</h2>
            
            <div>
                {
                    events.map(data=>{
                        if(data.Visible==0 && data.Date)
                        return(<div>
                            {data.EventTitle} by {data.Token}({data.Comment})<br></br> for {data.Date} <button onClick={()=>confirmBooking(data.Id, events, setEvents)}>confirm</button>
                        </div>)
                    })
                }
            </div>
        </div>
    );
}
export default BookingAdmin;