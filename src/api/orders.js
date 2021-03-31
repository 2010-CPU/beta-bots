import axios from 'axios';

import {order_url} from './';

const fetchOrderById = async (orderId, token) => {
    try {
        const orderId_url = `${order_url}/${orderId}`
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

// const fetchOrderById = async (id, token) => {
//     try {
//         const orderId_url = `${order_url}/${id}`
//         const response = await axios.get(orderId_url, {headers: {
//             'Authorization': `Bearer ${token}`
//         },
//     });
//         const {data} = response
//         console.log("data:", data)
//         return data.order
//     } catch (error) {
//         console.log(error)
//     }
// }


const fetchCartByUser = async (token) => {
    try {
        const orderId_url = `${order_url}/cart`
        const response = await axios.get(orderId_url, {headers: {
            'Authorization': `Bearer ${token}`
        },
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
    fetchCartByUser
}