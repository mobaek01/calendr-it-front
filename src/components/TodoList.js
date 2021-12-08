import React from 'react'
import moment from 'moment'

import { useSelector, useDispatch } from 'react-redux'
import { removeTodos } from '../redux/reducer'

import Edit from './Edit'

const TodoList = (props) => {

    const todoArr = useSelector((state) => state.todos)
    console.log(todoArr);
    const dispatch = useDispatch()

    return(
        <div className="todoList">
            <h1><u>Your Todo List</u></h1>
            {props.todos.length === 0 ?
                <>
                    <h3>You have no Todos, currently</h3>
                </>
            :
                <>
                    {props.todos.map((todo) => {
                        return(
                            <div className="todoItem" key={todo.todo_id}>
                                <h3 className="todoDetail">Todo Date: {moment(todo.todo_date).format('MM/DD/YYYY')}</h3>
                                <h3 className="todoDetail">Title: {todo.title}</h3>
                                <h3 className="todoDetail">Description: {todo.description}</h3>
                                <div className="times">
                                    <h3 className="todoDetail">Start Time: {moment(todo.start_time, "HH:mm").format('hh:mm a')}</h3>
                                    <h3 className="todoDetail">End Time: {moment(todo.end_time, "HH:mm").format('hh:mm a')}</h3>
                                </div>
                                <div className="editDelete">
                                    <button className="smallBtn" onClick={props.handleDelete,()=>dispatch(removeTodos(todo))} value={todo.todo_id}>DELETE</button>
                                    <Edit handleUpdate={props.handleUpdate} todo={todo}/>
                                </div>
                                <hr />
                            </div>
                        )
                    })}
                </>
            }

        </div>
    )
}

export default TodoList
