import axios from 'axios';

import {products_url} from './';

const handleAccountForm = async (formType, fields) => {
    const account_url = `${products_url}/${formType}`
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
        const response = axios.post(account_url, body, {
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
        
    } catch (error) {
        console.log(error)
    }
}

export {
    handleAccountForm
}