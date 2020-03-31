import React, {useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import {Form, Transition, Button, Icon, Grid} from 'semantic-ui-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Book.css';
import 'semantic-ui-react';
const localizer = momentLocalizer(moment)
const gridWidth = 500;
const Book = (props) => {
    const [events, setEvents] = useState([]);
    const [bookVisible, setBookVisible] = useState(false);
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const addEvent = () => {
        const event = {
            start: new Date(date),
            end: new Date(date),
            title: title,
            allDay: true
        }
        setDate("");
        setTitle("");
        setEvents(events.concat(event));
    }
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
