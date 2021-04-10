import axios from 'axios';
import {orderProducts_url} from './';

const deleteProductFromOrder = async(orderProductId, token) =>{
    try {
        const response = await axios.delete(`${orderProducts_url}/${orderProductId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
         })
        const data = response
        return data
    } catch (error) {
        throw error
    }
}
const updateOrderProduct = async (token, orderProductId, updateFields) => {
    try {
        const body = {
            price: updateFields.price,
            quantity: updateFields.quantity
        }
        const response = await axios.patch(`${orderProducts_url}/${orderProductId}`, body, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        })
        const {data} = response
        return data
    } catch (error) {
        console.log(error)
    }
}

export {
    deleteProductFromOrder,
    updateOrderProduct
}







