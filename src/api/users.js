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
            body.imageURL = image
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
        return error
    }
}


const fetchUser = async (token) => {
    try {
        if(token) {
            const me_url = `${users_url}/me`
            const response = await axios.get(me_url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const {data} = response
            return data
        } else {
            console.log("Invalid token.")
        }
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
        return data;
    } catch (error) {
        console.log(error);
    }
}



const fetchAllUsers = async (token) => {
    
    try {
                   
    const response = await axios.get(users_url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const {data} = response;
    return data.allUsers;
        
    } catch (error) {
        console.log(error);
    }
}


const fetchUserById = async (token, userId) => {
    try {
        const id_url = `${users_url}/${userId}`
        const response = await axios.get(id_url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const {data} = response;
        return data.user;

    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (token, updateFields, userId) => {
    try {
        const update_url = `${users_url}/${userId}`;
        const response = await axios.patch(update_url, updateFields, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        
        const {data} = response;
        return data.user

    } catch (error) {
        console.log(error);
    }
}

const adminCreateUser = async (token, userInfo) => {
    try {
        const response = await axios.post(users_url, userInfo, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        const {data} = response
        return data.user
        
    } catch (error) {
        console.log(error)
    }
}

const triggerPassReset = async (userId, token) => {
    try {
       const reset_pass_url = `${users_url}/resetpassword`
       const response = await axios.patch(reset_pass_url, {userId}, {
           headers: {
               'Authorization': `Bearer ${token}`,
               'Content-Type': 'application/json'
           }
       })
       const {data} = response
       return data.user
    } catch (error) {
        console.log(error)
    }
}

const confirmPasswordReset = async (userId, token, password) => {
    try {
        const confirm_pass_url = `${users_url}/confirmedpassword`
        const response = await axios.patch(confirm_pass_url, {userId, password}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        })

        const {data} = response
        return data.user
    } catch (error) {
        console.log(error)
    }
}

export {
    handleAccountForm,
    fetchAllUsers,
    fetchUser,
    fetchOrdersByUserId,
    fetchUserById,
    updateUser,
    adminCreateUser,
    triggerPassReset,
    confirmPasswordReset
}