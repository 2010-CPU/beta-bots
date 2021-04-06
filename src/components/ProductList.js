import React, { useEffect, useState } from 'react';
import {Product} from './'
import {fetchAllProducts} from '../api';

import './style/productlist.css'
const Products = ({product}) => {
    const {imageURL, name, price, category, id} = product

    return (
    <div className='product'>
        <a href ={`products/${id}`}>
        <img src={`${imageURL} ? ${id}`} alt={name}/>      
        <p>{name}</p>
        </a>
        <p>${price}</p>
        <p>{category}</p>
    </div>
    )
}

const ProductList = ({token}) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const products = await fetchAllProducts();
            setProducts(products);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [token])


    return <div className="products-container">
        {
            products.map(product => {
                return <Products key={product.id} product={product}/> 
        })
     }
        </div>
}



export default ProductList;
