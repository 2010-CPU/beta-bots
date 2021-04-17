import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import { fetchAllUsers, triggerPassReset } from '../api';
import './style/userslist.css'

const TriggerPassResetButton = (props) => {
    
    const {user, token} = props
    const {id} = user

    const triggerPasswordReset = async () => {
        try {
            const response = await triggerPassReset(id, token)
            console.log(response)
            alert("You have triggered a password reset.")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button className="trigger" onClick={triggerPasswordReset}>Trigger Password Reset</button>
    )
}

const UsersList = (props) => {
    const {token, user} = props
    const [users, setUsers] = useState([]);

    const history = useHistory()

    const fetchingUsers = async () => {
        try {
            const users = await fetchAllUsers(token);
            setUsers(users);
        } catch (error) {
            console.log(error);
        }
    }

    const sendToCreateUser = () => {
        history.push('/users/create')
    }

    useEffect(() => {
        fetchingUsers();
    }, [token]);

    if (!token || !user.isAdmin) {
        return <div>You must be logged in to view this page!</div>
    }

    const hasUserList = users && users.length > 0

    return (
        <div className="user-container">
            <div><img className="admin-image" src="/ADMIN.png"></img></div>
            <div className="create-user-button-container"><button onClick={sendToCreateUser}>Create User</button></div>
        <div>
            {
                hasUserList ? users.map(user => {
                    return (
                        <div className="user" key={user.id}>
                            <h3 className="user-name">{user.firstName} {user.lastName}</h3>
                            <p>Id: {user.id}</p>
                            <p>Username: <a href={`users/${user.id}`}>{user.username}</a></p>
                            <p id="email-input">Email: {user.email}</p>
                            { user && !user.isAdmin ? <TriggerPassResetButton token={token} user={user}/> : null}
                        </div>
                    )
                }) : null
            }
            </div>
            
        </div>

    )

}


export default UsersList;