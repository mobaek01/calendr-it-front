import React, {useState} from 'react'
import store from '../redux/store.js'

const Add = (props) => {

    let newEntry = {title:'', description:'', todo_date:'', start_time:'', end_time:''}

    let [newTodo, setNewTodo] = useState(newEntry)
    let [showAdd, setShowAdd] = useState(false)

    const handleChange = (event) => {
        setNewTodo({...newTodo, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleCreate(newTodo)
        store.dispatch({
            type:'ADD',
            todo:{...newTodo}
        })
    }

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
                    <form className="addForm" onSubmit={handleSubmit}>
                        <label htmlFor="title">Title:</label>
                        <input className="addField" type="text" name="title" onChange={handleChange}/>
                        <label htmlFor="description">Description:</label>
                        <textarea className="textarea" name="description" onChange={handleChange} />
                        <label htmlFor="todo_date">Due Date:</label>
                        <input className="addField" type="date" name="todo_date" onChange={handleChange}/>
                        <label htmlFor="start_time">Start Time:</label>
                        <input className="addField" type="time" name="start_time" onChange={handleChange}/>
                        <label htmlFor="end_time">End Time:</label>
                        <input className="addField" type="time" name="end_time" onChange={handleChange}/>
                        <br />
                        <input className="smallBtn" type="submit" value="Add Todo"/>
                    </form>
                    <button className="button" onClick={hideAdd}>Close</button>
                </div>
                :
                <button className="button" onClick={revealAdd}>Add</button>
            }

        </>
    )
}

export default Add
