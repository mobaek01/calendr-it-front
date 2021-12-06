import { createStore } from 'redux'

let todos = (state = [], action) => {
    switch(action.type){
        case 'ADD':
            return [...state, action.todo]
        default:
            return state
    }
}

let store = createStore(todos)
export default store
