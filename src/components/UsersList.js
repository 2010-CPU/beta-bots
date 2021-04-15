import React, { useState, useEffect } from 'react';
import { fetchAllUsers } from '../api';
import './style/userslist.css'

const UsersList = (props) => {
    const {token} = props
    const [users, setUsers] = useState([]);

    const fetchingUsers = async () => {
        try {
            const users = await fetchAllUsers(token);
            setUsers(users);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchingUsers();
    }, [token]);

    if (!token) {
        return <div>You must be logged in to view this page!</div>
    }

    const hasUserList = users && users.length > 0

    return (
        <div className="user-container">
            <img src="user.png"></img>
            <h2>Users</h2>
            {
                hasUserList ? users.map(user => {
                    return (

                        <div className="user">

                            <p>Id: {user.id}</p>
                            <p>Name: {user.firstName} {user.lastName}</p>
                            <p>Username: <a href={`users/${user.id}`}>{user.username}</a></p>
                            <p>Email: {user.email}</p>
                            <p>Admin? { user.isAdmin === true ? 'Yes' : 'No' }</p>
                            <hr />

                        </div>

                    )
                }) : null
            }
            {/* <Link to="/users/add">Add User</Link> */}
        </div>
    )

}


export default UsersList;