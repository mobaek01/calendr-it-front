import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const addTodoReducer = createSlice({
    name: 'todos',
    initialState,
    reducers:{
        addTodos:(state, action) => {
            state.push(action.payload)
            return state
        },
        removeTodos:(state, action) => {
            return state.filter((item) => item.todo_id !== action.payload)
        },
        updatedTodos:(state, action) => {
            return state.map((todo) => {
                if (todo.todo_id === action.payload.todo_id){
                    return {
                        ...todo,
                        title: action.payload.title,
                        description: action.payload.description,
                        todo_date: action.payload.todo_date,
                        start_time: action.payload.start_time,
                        end_time: action.payload.end_time
                    }
                }
                return todo
            })
        }
    }
})

export const{ addTodos, removeTodos, updatedTodos } = addTodoReducer.actions
export const reducer = addTodoReducer.reducer
