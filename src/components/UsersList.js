import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import { fetchAllUsers } from '../api';
import './style/userslist.css'

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
            <img src="user.png"></img>
            <h2>Users</h2>
        <div>
            <button onClick={sendToCreateUser}>Create User</button>
            {
                hasUserList ? users.map(user => {
                    return (

                        <div className="user" key={user.Id}>

                            <p>Id: {user.id}</p>
                            <p>Name: {user.firstName} {user.lastName}</p>
                            <p>Username: <a href={`users/${user.id}`}>{user.username}</a></p>
                            <p>Email: {user.email}</p>
                            <button>Trigger Password Reset</button>
                            <hr />

                        </div>

                    )
                }) : null
            }
            </div>
        </div>
    )

}


export default UsersList;