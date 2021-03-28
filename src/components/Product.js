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
            if(product) {
                setProduct(product)
            }
        } catch (error) {
            console.log(error)
        }
    }
  
    useEffect(() => {
        if(productId) {
            fetchSingleProduct();
        }
    }, [token]);
    
 return (
     product ? <div className='product'>
        <a href ={`products/${product.id}`}>
        <img src={`${product.imageURL} ? ${product.id}`} alt={product.name}/>      
        <p>{product.name}</p>
        </a>
        <p>${product.price}</p>
        <p>{product.category}</p>
    </div>  : 
    <div className='product'>
        <img src={`${_product.imageURL} ? ${_product.id}`} alt={_product.name}/>      
        <p>{_product.name}</p>
        <p>{_product.description}</p>
        <p>${_product.price}</p>
        <p>{_product.category}</p>
    </div>
    )
}
export default Product;