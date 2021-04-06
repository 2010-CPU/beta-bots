import axios from 'axios';

import {orders_url} from './';

const fetchOrderById = async (id, token) => {
    try {
        const orderId_url = `${orders_url}/${id}`
        const response = await axios.get(orderId_url, {headers: {
            'Authorization': `Bearer ${token}`
        },
    });
        const {data} = response
        return data.order
    } catch (error) {
        console.log(error)
    }
}

const fetchCart = async (token) => {
    try {
        const cart_url = `${orders_url}/cart`
        const response = await axios.get(cart_url, {
            headers: {
            'Authorization': `Bearer ${token}`
        }
    });
        const {data} = response
        return data.order
    } catch (error) {
        console.log(error)
    }
}

const completeOrder = async (token, orderId, updateFields) => {
    try {
        const {status, userId} = updateFields
        const update_order_url = `${orders_url}/${orderId}`
        const body = {
            status
        }
        if(userId) {
            body.userId = userId
        }
        const response = await axios.patch(update_order_url, body, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        })

        console.log(response)

    } catch (error) {
        console.log(error)
    }
}

const cancelOrder = async (orderId, token) => {
    try {
        const delete_url = `${orders_url}/${orderId}`
        const response = await axios.delete(delete_url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

export {
    fetchOrderById,
    fetchCart,
    completeOrder,
    cancelOrder
}

