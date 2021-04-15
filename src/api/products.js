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

const createProduct = async (token, product) => {
    try {
        const {price} = product
        product.price = Number(price).toFixed(2)
        if(!Number(product.price)) {
            console.log("Price not correct")
            return
        }

        const response = await axios.post(products_url,product, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        const {data} = response
        return data.product
    } catch (error) {
        console.log(error)
    }
}

const destroyProduct = async (token, productId) => {
    try {
        const destroy_url = `${products_url}/${productId}`
        const response = await axios.delete(destroy_url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const {data} = response
        return data.destroyedProduct;
    } catch (error) {
        console.log(error)
    }
}


export {
    fetchAllProducts,
    fetchProductById,
    createProduct,
    destroyProduct
}