import React, {useState} from 'react'

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
                    <form className="addForm"onSubmit={handleSubmit}>
                        <label htmlFor="title">Title:</label>
                        <br />
                        <input type="text" name="title" onChange={handleChange}/>
                        <br />
                        <label htmlFor="description">Description:</label>
                        <br />
                        <textarea name="description" onChange={handleChange} />
                        <br />
                        <label htmlFor="todo_date">Due Date:</label>
                        <br />
                        <input type="date" name="todo_date" onChange={handleChange}/>
                        <br />
                        <label htmlFor="start_time">Start Time:</label>
                        <br />
                        <input type="time" name="start_time" onChange={handleChange}/>
                        <br />
                        <label htmlFor="end_time">End Time:</label>
                        <br />
                        <input type="time" name="end_time" onChange={handleChange}/>
                        <br />
                        <input type="submit" value="Add Todo"/>
                    </form>
                    <button onClick={hideAdd}>Close</button>
                </div>
                :
                <button onClick={revealAdd}>Add</button>
            }

        </>
    )
}

export default Add
