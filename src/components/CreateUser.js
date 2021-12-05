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

    return(
        <>
            {showRegister ?
                <div className = "registerDiv">
                    <h3>Register</h3>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="user_name">Username: </label>
                        <input type="text" name="user_name" onChange={handleChange}/>
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" onChange={handleChange}/>
                        <br />
                        <input type="submit" />
                    </form>
                    <button onClick={hideRegister}>Close</button>
                </div>
            :
            <button onClick={revealRegister}>Register</button>
            }

        </>
    )
}

export default CreateUser
