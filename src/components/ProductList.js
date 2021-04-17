import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import {fetchAllProducts} from '../api';

import './style/productlist.css'
const Products = ({product}) => {
    const {imageURL, name, price, category, id} = product

    return (
    <div className="product-box">
        <div className="productlist-outer-container">
            <img id="productlist-image" src={`${imageURL} ? ${id}`} alt={name}/>  
            {/* <img id="productlist-image" ></img> */}
            <div className="product-list-text">
                <a href ={`products/${id}`} id="product-link">
                    <div className="product-list-name">{name}</div>
                </a> 
                    <div className="product-list-price">${price}</div>
                    <div className="product-list-category">{category}</div>
            </div>
        </div>
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


    if(user && user.passwordReset) {
        history.push('/account/resetpassword')
    }

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
