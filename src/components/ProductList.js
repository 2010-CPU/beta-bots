import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import {fetchAllProducts} from '../api';

import './style/productlist.css'
const Products = ({product}) => {
    const {imageURL, name, price, category, id} = product

    return (
    <div className='product'>
        <a href ={`products/${id}`}>
        <img className="product-image" src={`${imageURL} ? ${id}`} alt={name}/>      
        <p>{name}</p>
        </a>
        <p>${price}</p>
        <p>{category}</p>
    </div>
    )
}

const ProductList = ({token, user}) => {
    const [products, setProducts] = useState([]);

    const history = useHistory()

    const fetchProducts = async () => {
        try {
            const products = await fetchAllProducts();
            setProducts(products);
        } catch (error) {
            console.log(error)
        }
    }

    const sendToCreateProduct = () => {
        history.push('/products/create')
    }

    useEffect(() => {
        fetchProducts();
    }, [token])


    return(
        <> 
        {user && user.isAdmin ? <button onClick={sendToCreateProduct}>Create Product</button> : null}
        <div className="products-container">
            {
                products.map(product => {
                    return <Products key={product.id} product={product}/> 
                })
            }
        </div>
        </>
    )
}


export default ProductList;
