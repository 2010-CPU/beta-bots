import React, {useEffect, useState} from 'react'

import {
   useParams
  } from 'react-router-dom';

import {fetchProductById} from "../api"

const Product = (props) => {
    const {token, product} = props
    const [_product, setProduct] = useState({})
    const {productId} = useParams()
    const fetchAndSetProduct = async () => {
        try {
            const product = await fetchProductById(productId)
            setProduct(product)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAndSetProduct()
    }, [token])
    

    return (
        
        product ? <div className="product">
            <a href={`products/${product.id}`}>
            <img src={`${product.imageURL}?${product.id}`}></img>
            <p>{product.name}</p>
            </a>
        </div> : 
        <div className="product">
            <a href={`products/${_product.id}`}>
            <img src={`${_product.imageURL}?${_product.id}`}></img>
            <p>{_product.name}</p>
            </a>
        </div>
        
    )
}

export default Product;