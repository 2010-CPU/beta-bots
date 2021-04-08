import axios from 'axios';
import {orderProducts_url} from './';

const deleteProductFromOrder = async(orderProductId, token) =>{
    try {
        const response = await axios.delete(`${orderProducts_url}/${orderProductId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        )
        const data = response
        console.log('data:', data)
        return data
    } catch (error) {
        throw error
    }
}

export {
    deleteProductFromOrder
}







