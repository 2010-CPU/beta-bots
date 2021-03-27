import axios from 'axios';

import {products_url} from './';

const fetchAllProducts = async () => {
    try {
        const response = await axios.get(products_url);
        const {data} = response;
        return data.allProducts;
    } catch(error) {
        console.log(error);
    }
}


export {
    fetchAllProducts
}