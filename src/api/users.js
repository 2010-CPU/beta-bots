import axios from 'axios';

import {users_url} from './';

const handleAccountForm = async (formType, fields) => {
    const account_url = `${users_url}/${formType}`
    const {firstName, username, password, lastName, email, image} = fields
    const body = {username, password}
    if(formType === "register") {
        if(!firstName || !username || !password || !lastName || !email) {
            return {error: "Must have first name, username, password, last name, and email to register account"}
        }
        body.firstName = firstName
        body.lastName = lastName
        body.email = email
        if(image) {
            body.image = image
        }
    }
    try {
        const response = await axios.post(account_url, body, {
            headers: {
                'Content-type': 'application/json'
            }
        })
        const {data} = response
        return data
    } catch (error) {
        console.log(error)
    }
}

const fetchUser = async (token) => {
    try {
        const me_url = `${users_url}/me`
        const response = await axios.get(me_url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const {data} = response
        return data
    } catch (error) {
        console.log(error)
    }
}

const fetchOrdersByUserId = async (userId, token) => {
    try {
        const me_url = `${users_url}/${userId}/orders`
        const response = await axios.get(me_url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const {data} = response
        console.log("data:", data)
        return data;
    } catch (error) {
        
    }
}


export {
    handleAccountForm,
    fetchUser,
    fetchOrdersByUserId
}