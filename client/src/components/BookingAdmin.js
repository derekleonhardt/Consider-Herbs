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
    }).then((res)=>{bookingEvents(setMethod)});
}

const addEvent = (title, date, setTitleMethod, setDateMethod) => {
    if(title =="" || date == "") {
        alert("please fill required form");
        return;
    }
    fetch(`http://127.0.0.1:5000/api/db/booking/admin/insert`,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(
        {
            "token": "",
            "title": title,
            "comment":"",
            "date":date
        }
    )
    }).then((res)=>{
    setTitleMethod("");
    setDateMethod("");
    });
}

const BookingAdmin = (props) => {
    const [events, setEvents] = useState([]);
    const [newEventTitle, setEventTitle] = useState("");
    const [newEventDate, setEventDate] = useState("");
    if(events.length == 0)
        // bookingEvents(setEvents);
  return(
        <div className = "adminPanel bookingAdmin"> {/*Holds all glossary editing content */}
            <h2 className = "glossaryTitle">Booking</h2>
            
            <div>
                <h3>bookings to be confirmed</h3>
                {
                    events.map(data=>{
                        if(data.Visible==0 && data.Date)
                        return(<div>
                            {data.EventTitle} by {data.Token}({data.Comment})<br></br> for {data.Date} <button onClick={()=>confirmBooking(data.Id, events, setEvents)}>confirm</button>
                        </div>)
                    })
                }
                <h3>confirmed bookings and events</h3>
                {
                    events.map(data=>{
                        if(data.Visible==1 && data.Date)
                        return(<div>
                            - {data.EventTitle} {(data.Token !="")?<>by {data.Token}({data.Comment})<br></br> for {data.Date} {(data.Paid==1)?<a className="paid">paid</a>:<a className="unpaid">unpaid</a>}</>:<> for {data.Date}</>}
                        </div>)
                    })
                }
                <h3>add event to calendar</h3>
                <p>title: <input onChange={(event)=>setEventTitle(event.target.value)} value={newEventTitle} ></input></p>
                <p>date: <input type='date' onChange={(event)=>setEventDate(event.target.value)} value={newEventDate}></input></p>
                <p><button onClick={()=>{addEvent(newEventTitle, newEventDate, setEventTitle, setEventDate)}}>add</button></p>
            </div>
        </div>
    );
}
export default BookingAdmin;