import axios from 'axios';
import {checkout_url} from './';


const checkoutRequest = async (token, order, card) => {
    try {
        const response = await axios.post(checkout_url, {order, card}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type' : 'application/json'
            }
        })
        const {data} = response;
        return data
    } catch (error) {
        console.log(error);
    }

}

export {checkoutRequest}