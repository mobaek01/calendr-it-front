import React, { useState } from 'react'

const Login = (props) => {

    let newEntry = {user_name:'', password:''}

    let [newLogin, setNewLogin] = useState(newEntry)
    let [showLogin, setShowLogin] = useState(false)

    const handleChange = (event) => {
        setNewLogin({...newLogin, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleLogin(newLogin)
        console.log(newLogin);
    }

    const revealLogin = () => {
        setShowLogin(true)
    }

    const hideLogin = () => {
        setShowLogin(false)
    }

    return(
        <>
            {showLogin ?
                <div className = "loginDiv">
                    <h3><u>Login</u></h3>
                    <form className="formDiv" onSubmit={handleSubmit}>
                        <label htmlFor="user_name">Username: </label>
                        <br />
                        <input type="text" name="user_name" onChange={handleChange}/>
                        <br />
                        <label htmlFor="password">Password: </label>
                        <br />
                        <input type="password" name="password" onChange={handleChange}/>
                        <br />
                        <input className="smallBtn" type="submit" />
                    </form>
                    {props.error ?
                    <p>{props.error}</p>
                    :
                    <></>
                    }
                    <button className="smallBtn" onClick={hideLogin}>Close</button>
                </div>
            :
                <button className = "button revealBtn" onClick={revealLogin}>Login</button>
            }
        </>
    )
}

export default Login
