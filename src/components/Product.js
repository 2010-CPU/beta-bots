import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import {fetchProductById} from '../api';

const Product = (props) => {

    const {token} = props
    const { productId } = useParams()
    const [product, setProduct] = useState({})
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

    const handleAdd = () => {

    }
    const handleRemove = () => {

    }

 return (
    //  product ? 
    //  <div className='product'>
    //     <a href ={`products/${product.id}`}>
    //     <img src={`${product.imageURL} ? ${product.id}`} alt={product.name}/>      
    //     <p>{product.name}</p>
    //     </a>
    //     <p>${product.price}</p>
    //     <p>{product.category}</p>
    // </div> 
    //  : 
    <div className='product'>
        <img src={`${product.imageURL} ? ${product.id}`} alt={product.name}/>      
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <p>{product.category}</p>
        <button onClick={handleAdd}>Add to Cart</button>
    </div>
    )
}
export default Product;