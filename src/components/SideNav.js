import React, { useState } from 'react'

import Add from './Add'
import CreateUser from './CreateUser'
import Login from './Login'

const SideNav = (props) => {

    const revealSidebar = () => props.setSidebar(!props.sidebar)

    return(
        <>
            <div className="navbar">
                <div className="menu-bars">
                    <button className = "navBtn" onClick={revealSidebar}><img className = "navBtnImg" src ="/3lines.png" alt=""/></button>
                </div>
                <h1 className = "navTitle">Plan our life away with Calendr-It!</h1>
            </div>
            <div className={props.sidebar ? 'nav-menu active' : 'nav-menu'}>
                <div className="nav-menu-items">
                    <div className="sidbarMenu">
                        {props.currentUser.length === 1 ?
                            <div className = "userInfo">
                                <div className = "welcome">
                                    <h3>Welcome "<u>{props.currentUser[0].user_name}</u>"</h3>
                                    <button className = "button" onClick={props.handleLogout}>Logout</button>
                                </div>
                                <br />
                                <Add handleCreate={props.handleCreate} currentUser={props.currentUser}/>
                            </div>
                        :
                            <div className = "loggedOut">
                                <h2>Register or Login to plan out your future</h2>
                                <div className="loggedOutLeft">
                                    <CreateUser handleUserCreate={props.handleUserCreate} loginMessage={props.loginMessage}/>
                                </div>
                                <div className="loggedOutRight">
                                    <Login handleLogin={props.handleLogin} error={props.error}/>
                                </div>
                                <h3><u>About Calendr-It</u></h3>
                                <p></p>
                            </div>
                        }
                    </div>
                    <div className = "navLinks">
                        <a href="www.linkedin.com/in/moses-baek"><img className="socialBtn" src="/linkedin.png" alt=""/></a>
                        <a href="https://github.com/mobaek01"><img className="socialBtn" src="/github.png" alt=""/></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideNav
