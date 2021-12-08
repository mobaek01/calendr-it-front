import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import DatePicker from 'react-datepicker'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
    'en-US': require('date-fns/locale/en-US')
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})



const TodoCalendar = (props) => {

    // const events = [];
    const [events, setEvents] = useState([])
    console.log(events);

    // let eventFinder = () => {
    //     for (let i = 0; i < props.todos.length; i++) {
    //         events.push({title: props.todos[i].title, start: new Date(moment(props.todos[i].todo_date).format('YYYY,MM,DD')), end: new Date(moment(props.todos[i].todo_date).format('YYYY,MM,DD'))})
    //     }
    // }

    let eventFinder = () => {
        return(
            props.todos.map((todo) => {
                return(
                    ({title: todo.title, start: new Date(moment(todo.todo_date).format('YYYY,MM,DD')), end: new Date(moment(todo.todo_date).format('YYYY,MM,DD'))})
                )
            })
        )
    }

    useEffect(() => {
        setEvents(eventFinder())
    },[])


    return (
        <div>
            <Calendar className="calendar" localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{height:'70vh', width:'70vw'}} />
        </div>
    )
}

export default TodoCalendar
