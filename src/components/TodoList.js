import React from 'react'
import moment from 'moment'
import store from '../redux/store.js'
import { addTodos, removeTodos } from '../redux/reducer'
import { connect } from 'react-redux'

import Edit from './Edit'


export const mapStateToProps = (state) => {
    return {
        todos:state
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        addTodos: (obj) => dispatch(addTodos(obj)),
        removeTodos: (todo_id) => dispatch(removeTodos(todo_id))
    }
}

// removeTodos(todo.todo_id)

const TodoList = (props) => {
    return(
        <div className="todoList">
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
                            <button className="smallButton" onClick={props.handleDelete} value={todo.todo_id}>DELETE</button>
                            <Edit handleUpdate={props.handleUpdate} todo={todo}/>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TodoList
