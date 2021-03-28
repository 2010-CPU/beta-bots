import React, { useEffect, useState } from 'react';
import {Product} from './'
import {fetchAllProducts} from '../api';

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
                return <Product key={product.id} product={product}/>
                
        })
     }
        </div>
}



export default ProductList;
