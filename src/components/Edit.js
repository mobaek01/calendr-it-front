import React, { useState } from 'react'

import { updatedTodos } from '../redux/reducer'
import { mapStateToProps, mapDispatchToProps } from '../components/TodoList'

const Edit = (props) => {

    const [editTodo, setEditTodo] = useState(props.todo)

    const handleChange = (event) => {
        setEditTodo({...editTodo, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleUpdate(editTodo)
    }

    // onClick={(
    //     updatedTodos({
    //         ...editTodo
    //     })
    // )}

    return(
        <>
            <details>
                <summary>Edit a Todo</summary>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title:</label>
                    <br />
                    <input type="text" name="title" onChange={handleChange} value={editTodo.title}/>
                    <br />
                    <label htmlFor="description">Description:</label>
                    <br />
                    <textarea name="description" onChange={handleChange} value={editTodo.description}/>
                    <br />
                    <label htmlFor="todo_date">Due Date:</label>
                    <br />
                    <input type="date" name="todo_date" onChange={handleChange} value={editTodo.todo_date}/>
                    <br />
                    <label htmlFor="start_time">Start Time:</label>
                    <br />
                    <input type="time" name="start_time" onChange={handleChange} value={editTodo.start_time}/>
                    <br />
                    <label htmlFor="end_time">End Time:</label>
                    <br />
                    <input type="time" name="end_time" onChange={handleChange} value={editTodo.end_time}/>
                    <br />
                    <input type="submit" value="Edit Todo" />
                </form>
            </details>
        </>
    )
}

export default Edit
