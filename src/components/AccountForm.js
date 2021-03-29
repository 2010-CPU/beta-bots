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
    <div className="account-form">
        <form onSubmit={handleLogin}>
            <input type="text" placeholder="username" value={username} onChange={(ev) => {
                setUsername(ev.target.value)
            }}></input>
            <input type="password" placeholder="password" value={password} onChange={(ev) => {
                setPassword(ev.target.value)
            }}></input>
            {
                register ? 
                    <>
                        <input type="text" placeholder="first name" value={firstName} onChange={(ev) => {
                            setFirstName(ev.target.value)
                        }}></input>
                        <input type="text" placeholder="last name" value={lastName} onChange={(ev) => {
                            setLastName(ev.target.value)
                        }}></input>
                        <input type="text" placeholder="email" value={email} onChange={(ev) => {
                            setEmail(ev.target.value)
                        }}></input> 
                        <label>Default Picture? 
                        <input type="checkbox" value={isDefault} checked={isDefault} onChange={() => {
                            setDefault(!isDefault)
                        }}></input>
                        </label>
                        {!isDefault ? 
                            <input type="text" placeholder="image url" value={image} onChange={(ev) => {
                                setImageURL(ev.target.value)
                            }}></input>
                        : ""}
                    </> : ""
            }
            <button>Submit</button>
        </form>
        <Link to={`${oppositeLink}`}>Click me to {oppositeLink}</Link>
    </div>)
}

export default AccountForm;