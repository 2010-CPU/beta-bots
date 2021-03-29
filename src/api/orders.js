import axios from 'axios';

import {order_url} from './';


const fetchOrderById = async (id) => {
    try {
        const orderId_url = `${order_url}/${id}`
        const response = await axios.get(orderId_url)
        const {data} = response
        console.log("data:", data)
        return data.order
    } catch (error) {
        console.log(error)
    }
}
export {
    fetchOrderById
}