import React from 'react'

const Account = (props) => {

    const {user, token} = props

    if(!user.username) {
        return <div className="profile">You must be logged in to view this page.</div>
    }

    const {username, firstName, lastName, imageURL, email, isAdmin} = user

    return (
        <div className="profile">
            <img src={imageURL} alt={username}></img>
            <p>Full Name: {firstName} {lastName}</p>
            <p>Email: {email}</p>
            <p>Username: {username}</p>
            <label>Admin: 
            <input type="checkbox" checked={isAdmin} readOnly></input>
            </label>
        </div>
    )
}

export default Account;