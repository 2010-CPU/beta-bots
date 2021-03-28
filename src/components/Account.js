import React from 'react'

const Account = (props) => {

    const {user, token} = props

    if(!user.username) {
        return <div className="profile">You must be logged in to view this page.</div>
    }

    const {username, firstName, lastName, image, email} = user

    return (
        <div className="profile">
            <img src={image} alt={username}></img>
            <p>Name: {firstName} {lastName}</p>
            <p>Email: {email}</p>
            <p>Username: {username}</p>
        </div>
    )
}

export default Account;