import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import {fetchProductById} from '../api';

const Product = (props) => {
    const {token, product} = props
    const { productId } = useParams()
    const [_product, setProduct] = useState({})
    const fetchSingleProduct = async () => {
        try{
        const product = await fetchProductById(productId)
        setProduct(product)
        } catch (error) {
            console.log(error)
        }
    }
  
    useEffect(() => {
        fetchSingleProduct();
    }, [token]);
    
 return (
     product ? <div className='product-container'>
        <a href ={`products/${product.id}`}>
        <img src={`${product.imageURL} ? ${product.id}`} />      
        <div>{product.name}</div>
        <div>{product.description}</div>
        <div>{product.price}</div>
        <div>{product.category}</div>
        </a>
    </div>  :
        <a href ={`products/${_product.id}`}>
        <img src={`${_product.imageURL} ? ${_product.id}`} />      
        <div>{_product.name}</div>
        <div>{_product.description}</div>
        <div>{_product.price}</div>
        <div>{_product.category}</div>
        </a>
    )
}
export default Product;