import React, {useEffect} from 'react'

import {fetchProductById} from "../api"

const Product = (props) => {
    const {token, product} = props

    

    return (
        <div className="product">
            <img src={`${product.imageURL}?${product.id}`}></img>
            <p>{product.name}</p>
        </div>
    )
}

export default Product;