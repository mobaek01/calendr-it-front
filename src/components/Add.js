import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addTodos } from '../redux/reducer'
import { mapStateToProps, mapDispatchToProps } from '../components/TodoList'

const Add = (props) => {

    let newEntry = {title:'', description:'', todo_date:'', start_time:'', end_time:'', user_id:props.currentUser[0].user_id}

    let [newTodo, setNewTodo] = useState(newEntry)
    let [showAdd, setShowAdd] = useState(false)

    const handleChange = (event) => {
        setNewTodo({...newTodo, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleCreate(newTodo)
    }
    console.log('props from store', props);

    const revealAdd = () => {
        setShowAdd(true)
    }

    const hideAdd = () => {
        setShowAdd(false)
    }

    return(
        <>
            {showAdd ?
                <div className = "addDiv">
                    <h3>Add a Todo</h3>
                    <p>*: Required</p>
                    <form className="addForm" onSubmit={handleSubmit}>
                        <label htmlFor="title">Title *:</label>
                        <input className="addField" type="text" name="title" onChange={handleChange} />
                        <label htmlFor="description">Description *:</label>
                        <textarea className="textarea" name="description" onChange={handleChange} />
                        <label htmlFor="todo_date">Due Date *:</label>
                        <input className="addField" type="date" name="todo_date" onChange={handleChange} />
                        <label htmlFor="start_time">Start Time *:</label>
                        <input className="addField" type="time" name="start_time" onChange={handleChange} />
                        <label htmlFor="end_time">End Time *:</label>
                        <input className="addField" type="time" name="end_time" onChange={handleChange} />
                        <br />
                        <input className="smallBtn" type="submit" value="Add Todo" onClick={() => {
                            props.addTodos({
                                ...newTodo
                            })
                        }}/>
                    </form>
                    <button className="button" onClick={hideAdd}>Hide</button>
                </div>
                :
                <button className="button" onClick={revealAdd}>Add</button>
            }
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Add)
