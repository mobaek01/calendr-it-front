import React, {useState, useEffect} from 'react'
import axios from 'axios'

// COMPONENTS //
import TodoList from './components/TodoList'
import TodoCalendar from './components/Calendar'
import SideNav from './components/SideNav'

const App = () => {

    // backend urls
    // const backend_url = "http://localhost:3000"
    const backend_url = "https://calendr-it.herokuapp.com"

    let [todos, setTodos] = useState([])
    let [users, setUsers] = useState([])
    let [error, setError] = useState('')
    let [loginMessage, setLoginMessage] = useState('')
    let [currentUser, setCurrentUser] = useState({})
    let [currentUserID, setCurrentUserID] = useState()

    let [sidebar, setSidebar] = useState(false)
    let [view, setView] = useState(true)

    /////////////////////////////// TODO ////////////////////////////////////
    // READ
    const getTodos = () => {
        axios
            .get(backend_url + '/todos/' + currentUserID)
            .then((response) => {
                setTodos(response.data)
                // console.log(todos);
            })
    }

    // CREATE
    const handleCreate = (addTodo) => {
        axios
            .post(backend_url + '/todos', addTodo)
            .then((response) => {
                // console.log(response);
                // console.log(addTodo);
                getTodos()
            })
    }

    // UPDATE
    const handleUpdate = (updatedTodo) => {
        axios
            .put(backend_url + `/todos/${updatedTodo.todo_id}`, updatedTodo)
            .then((response) => {
                getTodos()
                // console.log(updatedTodo);
            })
    }

    // DELETE
    const handleDelete = (event) => {
        axios
            .delete(backend_url + `/todos/${event.target.value}`)
            .then((response) => {
                // console.log(event.target.value);
                getTodos()
            })
    }

    //=====================================================================//

    /////////////////////////////// USER ///////////////////////////////////

    const getUsers = () => {
        axios
            .get(backend_url + '/todos/userCreate')
            .then((response) => {
                setUsers(response.data)
                // console.log(response.data);
            })
    }

    const handleUserCreate = (addUser) => {
        axios
            .post(backend_url + '/todos/userCreate', addUser)
            .then((response) => {
                // console.log(response);
                // console.log(addTodo);
                getUsers()
                // console.log(response.data.message);
                setLoginMessage(response.data.message)
            })
    }

    const handleLogin = (checkUser) => {
        axios
            .put(backend_url + '/todos/login', checkUser)
            .then((response) => {
                setCurrentUser(response.data)
                // console.log(response.data);
                localStorage.setItem('user', JSON.stringify(response.data))
                localStorage.setItem('user_id', JSON.stringify(response.data[0].user_id))
                setError(response.data.error)
                setCurrentUserID(response.data[0].user_id)
                // console.log(response.data.error);

            })
    }

    const handleLogout = () => {
        setCurrentUser({})
        setTodos([])
        localStorage.clear()
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser)
            setCurrentUser(foundUser)
        }
        const loggedInId = localStorage.getItem('user_id')
        if (loggedInId) {
            const foundId = JSON.parse(loggedInId)
            setCurrentUserID(foundId)
        }
    }, [])

    //=====================================================================//

    const showCalendar = () => {
        view ? setView(false) : setView(true)
    }

    const showList = () => {
        setView('list')
    }

    //=====================================================================//

    useEffect(() => {
        if (currentUserID){
            getTodos()
        }
    },[currentUserID])

    return (
        <div className="container">
            <SideNav currentUser={currentUser} handleLogout={handleLogout} handleCreate={handleCreate} handleUserCreate={handleUserCreate} loginMessage={loginMessage} handleLogin={handleLogin} error={error} sidebar={sidebar} setSidebar={setSidebar}/>
            <div className = {sidebar ? 'mainbody left' : 'mainbody'}>
                <button className="smallBtn switch" onClick={showCalendar}>Switch View</button>
                {view ?
                <>
                    <TodoList handleDelete={handleDelete} handleUpdate={handleUpdate} todos={todos}/>
                </>
                :
                <>
                    <TodoCalendar todos={todos}/>
                </>
                }
            </div>
        </div>
    )
}

export default App;
