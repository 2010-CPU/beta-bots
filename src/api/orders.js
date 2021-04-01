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
        console.log("data:", data)
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
        console.log("data:", data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export {
    fetchOrderById,
    fetchCart
}

