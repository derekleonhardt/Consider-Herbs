import React, {useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import {Form, Transition, Button, Icon, Grid} from 'semantic-ui-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Book.css';
import 'semantic-ui-react';
import { useAuth0 } from "../../react-auth0-spa";
import { useHistory } from "react-router-dom";
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
                            var displayDate = new Date(d.Date);
                            displayDate = new Date(displayDate.setTime(displayDate.getTime() + 1 * 86400000));
                            events.push(
                                {
                                    start: new Date(displayDate),
                                    end: new Date(displayDate),
                                    title: d.EventTitle+" by "+d.Token,
                                    allDay: true,
                                    email: d.Comment,
                                    bid: d.Id,
                                    paid: d.Paid,
                                    name: d.Token,
                                    eventTitle: d.EventTitle
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


const Book = ({ products, selectProduct }) => {
    const [events, setEvents] = useState([]);
    const [bookVisible, setBookVisible] = useState(false);
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const { isLoading, user, loginWithRedirect, logout} = useAuth0();
    const history = useHistory();
    const handlePurchase = (bid) => {
        console.log(bid+"is bid");
        selectProduct( {
          name: 'Booking',
          desc: `Booking fee`,
          price: 9.99,
          id: bid,
          email: user.email
        });
        history.push('/Checkout');
  }
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
        <p></p>
        <Grid centered className="grid" columns={1} verticalAlign="middle" centered>
            <Grid.Row>
            {
                events.map((event)=>{
                    if(event.email == user.email && event.paid != 1)
                    return(
                        <>
                            <div className="paymentBox">
                                <h1  className="paymentTitle">Pending Payment</h1>
                    <p>booking for {event.eventTitle} on {event.start.getFullYear()+"/"+(event.start.getMonth()+1)+"/"+event.start.getDate()}</p>
                                <Button  positive onClick = {()=>handlePurchase(event.bid)}>Pay</Button>
                            </div>
                        </>
                    )
                })
            }
            </Grid.Row>
            <Grid.Row className="headerRow" verticalAlign="middle">
                <Grid.Column width={10} textAlign="center" verticalAlign="middle">
                    <div className="calendar">
                        <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        />
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row className="headerRow">
                <Grid.Column width={8} textAlign="center" verticalAlign="middle">
                    <Transition visible={bookVisible} animation="fly up" duration={800} unmountOnHide={true}>
                        <div className="popup">
                            <Form onSubmit={addEvent}>
                                <Form.Group widths="equal">
                                    <Form.Input name='title' value={title} fluid label='Title' width={1} onChange={(event)=>setTitle(event.target.value)} required placeholder='Enter Title'/>
                                </Form.Group>
                                <Form.Group widths="equal">
                                    <Form.Input type="date" name="date" value={date} fluid label='Date' onChange={(event)=>setDate(event.target.value)} required placeholder='2020-03-31'></Form.Input>
                                </Form.Group>
                                <Form.Button  primary>Submit</Form.Button>
                            </Form>
                        </div>
                    </Transition>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row className="headerRow">
                <Grid.Column width={gridWidth} textAlign="center" verticalAlign="middle" centered>
                {bookVisible? <Button className="button" onClick={()=>{setBookVisible(false);}}>Cancel</Button> : <Button className="button" onClick={()=>{setBookVisible(true);}}><Icon fitted name='edit'/>Book Consultation</Button>}
                </Grid.Column>
                
            </Grid.Row>
            <Grid.Row className="headerRow">
                
            </Grid.Row>
            <Grid.Row>
                <div>
                    <p className="signUp">
                    Consider signing up for Consider Herb’s premium membership today! You will receive unlimited access to all recipes and the herb glossary, as well as the ability to join me for all online videos and classes!
                    </p>
                    <p></p>
                    <Button positive  size="huge" className="button">Become A Premium Member</Button>
                </div>
            </Grid.Row>
            <Grid.Row></Grid.Row>

        </Grid>
        </>
    );
}

export default Book;
