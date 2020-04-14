import React, {useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import {Form, Transition, Button, Icon, Grid} from 'semantic-ui-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Book.css';
import 'semantic-ui-react';
import { useAuth0 } from "../../react-auth0-spa";
const localizer = momentLocalizer(moment)
const gridWidth = 500;
const bookingEvents = (setMethod) => {
    fetch(`http://127.0.0.1:5000/api/db/booking/`).then(
            (response)=>{
                (response.json().then(data =>{
                    //console.log(data);
                    var events = [];
                    data.data.map(d=>{
                        if(d.Visible == 1) {
                            events.push(
                                {
                                    start: new Date(d.Date),
                                    end: new Date(d.Date),
                                    title: d.EventTitle+" by "+d.Token,
                                    allDay: true
                                }
                            )
                        }  
                    });
                    setMethod(events);
            }))
    });
}
const commitBooking = (event) => {
    fetch(`http://127.0.0.1:5000/api/db/booking/commit`,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
    }).then(
        (response)=>{
            (response.json().then(data=>{
                console.log(data);
                if(data.success)
                    alert("booking request successful. Admin has to confirm it.");
                else
                    alert("something went wrong");
            }))
        }
    );
}

const Book = (props) => {
    const [events, setEvents] = useState([]);
    const [bookVisible, setBookVisible] = useState(false);
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const { isLoading, user, loginWithRedirect, logout} = useAuth0();
    const addEvent = () => {
        if(!user) {
            alert("You need to sign in!");
            return;
        }
        const event = {
            token: user.name,
	        title: title,
	        comment:user.email,
	        date:date
        }
        setDate("");
        setTitle("");
        commitBooking(event);
    }

    const addStaticEvent = (event) => {
        setEvents(events.concat(event));
    }
    if(events.length == 0) {
        console.log(user);
        bookingEvents(setEvents);
    }
    if(!user)
    return(<><h1>you need to sign in!</h1></>)
    else
    return (
        <>
        <Grid centered stackable className="grid">
        <Grid.Row className="headerRow">
        <Grid.Column width={gridWidth} textAlign="center" verticalAlign="middle">
           <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        />
        </Grid.Column>
        </Grid.Row>
        <Grid.Row className="headerRow">
        <Grid.Column width={gridWidth} textAlign="center" verticalAlign="middle">
        <Transition visible={bookVisible} animation="fly up" duration={800} unmountOnHide={true}>
            <div>
            <Form onSubmit={addEvent}>
            <Form.Group widths="equal">
                <Form.Input name='title' value={title} fluid label='Title' width={5} onChange={(event)=>setTitle(event.target.value)} required placeholder='Enter Title'/>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input type="date" name="date" value={date} fluid label='Date' onChange={(event)=>setDate(event.target.value)} required placeholder='2020-03-31'></Form.Input>
            </Form.Group>
            <Form.Group>
                <Form.Button primary>Submit</Form.Button>
            </Form.Group>
        </Form>
            </div>
        </Transition>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row className="headerRow">
        <Grid.Column width={gridWidth} textAlign="center" verticalAlign="middle">
        {bookVisible? <Button onClick={()=>{setBookVisible(false);}}>Cancel</Button> : <Button onClick={()=>{setBookVisible(true);}}><Icon fitted name='edit'/>Book Consultation</Button>}
        </Grid.Column>
        </Grid.Row>

        </Grid>
        </>
    );
}

export default Book;
