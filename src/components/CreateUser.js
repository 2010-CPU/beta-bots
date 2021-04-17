import React, {useState} from 'react'

import {useHistory} from 'react-router-dom'

import {adminCreateUser} from '../api'

import './style/createuser.css'

const CreateUser = (props) => {

    const {token, admin} = props

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [imageURL, setImageURL] = useState('')

    const history = useHistory()

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        try {
            const userToCreate = {
                firstName, 
                lastName,
                username,
                password,
                email,
                isAdmin
            }
            if(imageURL) {
                userToCreate.imageURL = imageURL
            }
            const user = await adminCreateUser(token, userToCreate)
            if(user && user.id) {
                alert(`Created User: ${username}`)
                history.push('/admin')
            } else {
                alert('Error creating user.')
            }
        } catch (error) {
            console.log(error)
        }
    }

    if(!token || !admin.isAdmin) {
        return <div>You must be logged in to view this page.</div>
    }

    return (
        <div className="create-user-container">
            <img id="create-user-image" src="/create_user.png"></img>
            <form onSubmit={handleSubmit}>
                <input value={firstName} type="text" required={true} placeholder="First Name" onChange={(ev) => {
                    setFirstName(ev.target.value)
                }}></input>
                <input value={lastName} type="text" required={true} placeholder="Last Name" onChange={(ev) => {
                    setLastName(ev.target.value)
                }}></input> <br />
                <input value={username} type="text" required={true} placeholder="Username" onChange={(ev) => {
                    setUsername(ev.target.value)
                }}></input>
                <input value={password} required={true} type="password" placeholder="Password" onChange={(ev) => {
                    setPassword(ev.target.value)
                }}></input> <br />
                <input value={email} required={true} type="text" placeholder="Email" onChange={(ev) => {
                    setEmail(ev.target.value)
                }}></input>
                <input value={imageURL} type="text" placeholder="Image URL" onChange={(ev) => {
                    setImageURL(ev.target.value)
                }}></input>
                <br />
                <label id="set-admin-label">Set Admin:
                <input checked={isAdmin} id="admin-checkbox" type="checkbox" onChange={() => {
                    setIsAdmin(!isAdmin)
                }}></input>
                </label>
                <br />
                <button id="create-user-button">Create User</button>
            </form>
        <div>
            <img id="man-with-guitar" src="/background.jpeg"></img>
        </div>
        </div>
        
    )
}

export default CreateUser;