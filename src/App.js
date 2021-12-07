import React, {useState, useEffect} from 'react'
import axios from 'axios'
import store from './redux/store.js'

// COMPONENTS //
import Add from './components/Add'
import CreateUser from './components/CreateUser'
import Login from './components/Login'
import TodoList from './components/TodoList'
import TodoCalendar from './components/Calendar'

const App = () => {

    // backend urls
    const backend_url = "http://localhost:3000"
    // const backend_url = "https://calendr-it.herokuapp.com"

    let [todos, setTodos] = useState([])
    console.log(todos);
    let [users, setUsers] = useState([])
    let [error, setError] = useState('')
    let [currentUser, setCurrentUser] = useState({})
    let [currentUserID, setCurrentUserID] = useState()
    console.log(currentUserID);
    let [sideNav, setSideNav] = useState(false)
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
                console.log(response);
                console.log(addTodo);
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

    const revealSideNav = () => {
        sideNav ? setSideNav(false) : setSideNav(true)
    }

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
            <div className="containerLeft">
                {sideNav ?
                <>
                    <div className = "sideNav">
                        <div className = 'navTop'>
                            {currentUser.length === 1 ?
                                <div className = "userInfo">
                                    <div className = "welcome">
                                        <h3>Welcome to Calendr-It, "<u>{currentUser[0].user_name}</u>"</h3>
                                        <button className = "button" onClick={handleLogout}>Logout</button>
                                    </div>
                                    <br />
                                    <Add handleCreate={handleCreate} currentUser={currentUser}/>
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
        </div>
    )
}

export default App;
