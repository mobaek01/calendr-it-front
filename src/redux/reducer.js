import { createSlice } from '@reduxjs/toolkit'

export const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers:{
        addTodos:(todosArr, action) => {
            return [...todosArr, action.payload]
        },
        removeTodos:(todosArr, action) => {
            return todosArr.filter((item) => item.todo_id !== action.payload)
        },
        updatedTodos:(todosArr, action) => {
            return todosArr.map((todo) => {
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

export const{ addTodos, removeTodos, updatedTodos } = todosSlice.actions
export default todosSlice.reducer
