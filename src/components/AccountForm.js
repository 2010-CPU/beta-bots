import React, { useState} from 'react'
import { Link, useHistory } from 'react-router-dom'

import {handleAccountForm} from '../api'

import './style/accountform.css'

const AccountForm = (props) => {

    const {setToken, register} = props

    const history = useHistory()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [image, setImageURL] = useState("")

    const [isDefault, setDefault] = useState(true)
    const title = register ? "Register" : "Login";
    const oppositeLink = register ? "login" : "register"
    const route = register ? "register" : "login"

    const handleLogin = async (ev) => {
        ev.preventDefault()
        try {
            if(isDefault) {
                setImageURL("")
            }
            const response = await handleAccountForm(route, {
                username,
                password,
                email,
                firstName,
                lastName,
                image
            })
            if(response && response.token) {
                localStorage.setItem('grace-token', response.token)
                setToken(response.token)
                history.push("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
      
     <div className="account-form-container">
        <div className="account-form">
        <form className="submit-form" onSubmit={handleLogin}>
        <h2 className="title">{title}</h2>
            <input type="text" placeholder="username" className="input" value={username} onChange={(ev) => {
                setUsername(ev.target.value)
            }}></input>
            <input type="password" placeholder="password" className="input" value={password} onChange={(ev) => {
                setPassword(ev.target.value)
            }}></input>
            {
                register ? 
                    <>
                        <input type="text" placeholder="first name" className="input" value={firstName} onChange={(ev) => {
                            setFirstName(ev.target.value)
                        }}></input>
                        <input type="text" placeholder="last name" className="input" value={lastName} onChange={(ev) => {
                            setLastName(ev.target.value)
                        }}></input>
                        <input type="text" placeholder="email" className="input" value={email} onChange={(ev) => {
                            setEmail(ev.target.value)
                        }}></input> 
                        <label className="default">Default Picture? 
                        <input type="checkbox" className="checkbox" value={isDefault} checked={isDefault} onChange={() => {
                            setDefault(!isDefault)
                        }}></input>
                        </label>
                        {!isDefault ? 
                            <input type="text" className="input" placeholder="image url" value={image} onChange={(ev) => {
                                setImageURL(ev.target.value)
                            }}></input>
                        : ""}
                    </> : ""
            }
            <button className="glow-on-hover">Submit</button>
        <Link className="opposite-link" to={`${oppositeLink}`}>Click me to {oppositeLink}</Link>
        </form>
    </div>
    </div>
    </>
    )
}

export default AccountForm;