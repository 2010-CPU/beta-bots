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

const fetchProductById = async (id) => {
    try {
        const id_url = `${products_url}/${id}`
        const response = await axios.get(id_url)
        const {data} = response
        return data.product
    } catch (error) {
        console.log(error)
    }
}


export {
    fetchAllProducts,
    fetchProductById
}