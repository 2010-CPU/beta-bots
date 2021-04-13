import React from 'react';
import adduserform from './style/adduserform.css'

const AddUserForm = () => {

    return (
        <div>
            <h1>Add User</h1>
            <form id="add-user">
                <label>First name:</label>
                <input type="text"></input>
                <label>Last name:</label>
                <input type="text"></input>
                <label>Username:</label>
                <input type="text"></input>
                <label>Password:</label>
                <input type="password"></input>
                <label>Email:</label>
                <input type="email"></input>
                <label>Admin?</label><input type="checkbox"></input>
                <button type="submit">Add User</button>
            </form>
        </div>
    )
}



export default AddUserForm;