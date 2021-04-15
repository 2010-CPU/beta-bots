import React, {useState, useEffect} from 'react';
import { fetchUserById, updateUser } from '../api';
import { useParams } from 'react-router-dom';

const EditUser = (props) => {
    const {user, token, fetchAndSetUser} = props;

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

    if(!token || !user.isAdmin) {
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
            <button>Edit User</button>
            </form>         
        </div> : <button onClick={() => {
            setEditForm(!showEditForm)
        }}>Edit</button>
    )
}

const SingleUser = ({token}) => {
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

    if (!token) {
        return <div>You must be logged in to view this page!</div>
    }

    return (
        <div className="single-user">
            <p>Id: {user.id}</p>
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <label>Admin: 
            <input type="checkbox" readOnly checked={user.isAdmin}></input>
            </label>
            {
                user && user.id ? <EditUser token={token} user={user} fetchAndSetUser={fetchAndSetUser}/> : ''
            }

        </div>
    )

}


export default SingleUser;
