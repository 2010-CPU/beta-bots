import React, {useState, useEffect} from 'react';
import { fetchUserById, updateUser } from '../api';
import { useParams } from 'react-router-dom';

import './style/singleuser.css'

const EditUser = (props) => {
    const {user, token, fetchAndSetUser, admin} = props;

    const {firstName, lastName, email, isAdmin, imageURL, id} = user; 
    const [newFirstName, setFirstName] = useState(firstName);
    const [newLastName, setLastName] = useState(lastName);
    const [newEmail, setNewEmail] = useState(email);
    const [updateAdmin, setAdmin] = useState(isAdmin);
    const [newImageURL, setImageURL] = useState(imageURL);
    const [showEditForm, setEditForm] = useState(false);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            if (token) {
                const updatedUser = await updateUser(token, {
                    firstName: newFirstName,
                    lastName: newLastName,
                    email: newEmail, 
                    isAdmin: updateAdmin, 
                    imageURL: newImageURL
                }, id)
                fetchAndSetUser();
                setEditForm(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    if(!token || admin && !admin.isAdmin) {
        return <div>You must be logged in to view this page.</div>
    }

    return (
       showEditForm && !user.isAdmin ? <div className="edit-user">
            <form onSubmit={handleSubmit}>
            <input type="text" value={newFirstName} onChange={(ev) => {
                setFirstName(ev.target.value)
            }}></input>
            <input type="text" value={newLastName} onChange={(ev) => {
                setLastName(ev.target.value)
            }}></input>
            <input type="text" value={newEmail} onChange={(ev) => {
                setNewEmail(ev.target.value)
            }}></input>
            <input type="text" value={newImageURL} onChange={(ev) => {
                setImageURL(ev.target.value)
            }}></input>
            <label>Set Admin:  
            <input type="checkbox" checked={updateAdmin} onChange={() => {
                setAdmin(!updateAdmin)
            }}></input>  
            </label>
            <button className="form-edit-button">Edit User</button>
            </form>         
            <button className="cancel-button" onClick={() => {
                setEditForm(false)
            }}>Cancel</button>
        </div> : <button className="show-edit-button" onClick={() => {
            setEditForm(!showEditForm)
        }}>Edit</button>
    )
}

const SingleUser = ({token, admin}) => {
const [user, setUser] = useState({});
const { userId } = useParams();
const fetchAndSetUser = async () => {
    try {
        const fetchedUser = await fetchUserById(token, userId)
        setUser(fetchedUser)
    } catch (error) {
        console.log(error);
    }
}

    useEffect (() => {
        if (token) {
            fetchAndSetUser();
        }
    }, [token])

    if (!token || admin && !admin.isAdmin) {
        return <div>You must be logged in to view this page!</div>
    }

    return (
        <div className="single-user-page">
            <img src="/divider.png"></img>
            <div className="single-user">
                <h3>{user.firstName} {user.lastName}</h3>
                <img src={user.imageURL} alt={user.username}></img>
                <p>Id: {user.id}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <label>Admin: 
                <input type="checkbox" readOnly checked={user.isAdmin} value={user.isAdmin}></input>
                </label>
                {
                    user && user.id ? <EditUser token={token} user={user} admin={admin} fetchAndSetUser={fetchAndSetUser}/> : ''
                }

            </div>
        </div>
    )

}


export default SingleUser;
