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

console.log('user', user)
    return (
       showEditForm ? <div className="edit-user">
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
            <input type="checkbox" checked={updateAdmin} onChange={() => {
                setAdmin(!updateAdmin)
            }}></input>  
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

    console.log('USER!!', user)

    if (!token) {
        return <div>You must be logged in to view this page!</div>
    }

    return (
        <div className="single-user">
            <p>Id: {user.id}</p>
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Admin? {user.isAdmin ? 'Yes' : 'No'}</p>

            {
                user && user.id ? <EditUser token={token} user={user} fetchAndSetUser={fetchAndSetUser}/> : ''
            }

        </div>
    )

}


export default SingleUser;
