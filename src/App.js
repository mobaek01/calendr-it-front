import React, {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'

// COMPONENTS //
import Add from './components/Add'
import Edit from './components/Edit'
import CreateUser from './components/CreateUser'
import Login from './components/Login'

const App = () => {

    // backend urls
    const backend_url = "http://localhost:3000"
    // const backend_url = "https://calendr-it.herokuapp.com"

    let [todos, setTodos] = useState([])
    let [users, setUsers] = useState([])
    let [error, setError] = useState('')
    let [currentUser, setCurrentUser] = useState({})
    let [sideNav, setSideNav] = useState(false)

    /////////////////////////////// TODO ////////////////////////////////////
    // READ
    const getTodos = () => {
        axios
            .get(backend_url + '/todos')
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
                console.log(response.data);
            })
    }

    const handleUserCreate = (addUser) => {
        axios
            .post(backend_url + '/todos/userCreate', addUser)
            .then((response) => {
                // console.log(response);
                // console.log(addTodo);
                getUsers()
            })
    }

    const handleLogin = (checkUser) => {
        axios
            .put(backend_url + '/todos/login', checkUser)
            .then((response) => {
                setCurrentUser(response.data)
                console.log(response.data);
                localStorage.setItem('user', JSON.stringify(response.data))
                setError(response.data.error)
                console.log(response.data.error);

            })
    }

    const handleLogout = () => {
        setCurrentUser({})
        localStorage.clear()
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser)
            setCurrentUser(foundUser)
        }
    }, [])

    //=====================================================================//

    const revealSideNav = () => {
        sideNav ? setSideNav(false) : setSideNav(true)
    }

    //=====================================================================//

    useEffect(() => {
        getTodos()
        getUsers()
    },[])

    return (
        <div className="container">
            <div className="containerLeft">
                {sideNav ?
                <>
                    <div className = "sideNav">
                        <h3><u>Welcome to Calendr-It</u></h3>
                        <div className = 'navTop'>
                            {currentUser.length === 1 ?
                                <div className = "userInfo">
                                    <h4>Welcome, {currentUser[0].user_name}</h4>
                                    <button onClick={handleLogout}>Logout</button>
                                    <br />
                                    <Add handleCreate={handleCreate}/>
                                </div>
                            :
                                <div className = "loggedOut">
                                    <div className="loggedOutLeft">
                                        <CreateUser handleUserCreate={handleUserCreate}/>
                                    </div>
                                    <div className="loggedOutRight">
                                        <Login handleLogin={handleLogin} error={error}/>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className = "navBot">
                            <a href="www.linkedin.com/in/moses-baek"><img className="socialBtn" src="/linkedin.png" alt=""/></a>
                            <a href="https://github.com/mobaek01"><img className="socialBtn" src="/github.png" alt=""/></a>
                        </div>
                    </div>
                </>
                :
                <></>}
                <div className="sidenavToggle">
                    <button className = "navBtn" onClick={revealSideNav}><img className = "navBtnImg" src ="/3lines.png" alt=""/></button>
                </div>
            </div>
            <div className="containerRight">
                <div className = "mainBody">
                    <h1>Plan your LIFE away</h1>
                    <div>
                        {todos.map((todo) => {
                            return(
                                <div key={todo.todo_id}>
                                    <h3>Title: {todo.title}</h3>
                                    <h3>Description: {todo.description}</h3>
                                    <h3>Due Date: {moment(todo.todo_date).format('MM/DD/YYYY')}</h3>
                                    <h3>Start Time: {moment(todo.start_time, "HH:mm").format('hh:mm a')}</h3>
                                    <h3>End Time: {moment(todo.end_time, "HH:mm").format('hh:mm a')}</h3>
                                    <button onClick={handleDelete} value={todo.todo_id}>DELETE</button>
                                    <Edit handleUpdate={handleUpdate} todo={todo}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;
