import React, { useState } from 'react'

const CreateUser = (props) => {

    let newEntry = {user_name:'', password:''}

    let [newAcc, setNewAcc] = useState(newEntry)
    let [showRegister, setShowRegister] = useState(false)

    const handleChange = (event) => {
        setNewAcc({...newAcc, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleUserCreate(newAcc)
        console.log(newAcc);
    }

    const revealRegister = () => {
        setShowRegister(true)
    }

    const hideRegister = () => {
        setShowRegister(false)
    }
    console.log(showRegister);

    return(
        <>
            {showRegister ?
                <div className = "registerDiv">
                    <h3><u>Register</u></h3>
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
                        {props.loginMessage}
                    </form>
                    <button className="smallBtn" onClick={hideRegister}>Close</button>
                </div>
            :
            <button className = "button revealBtn" onClick={revealRegister}>Register</button>
            }

        </>
    )
}

export default CreateUser
