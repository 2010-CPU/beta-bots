import React, { useState, useEffect } from 'react';
import { fetchAllUsers } from '../api';

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
        <div>
            {
                hasUserList ? users.map(user => {
                    return (

                        <div>
                            <p>Id: {user.id}</p>
                            <p>Name: {user.firstName} {user.lastName}</p>
                            <p>Username: <a href={`users/${user.id}`}>{user.username}</a></p>
                            <p>Email: {user.email}</p>
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