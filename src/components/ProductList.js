import React, {useState, useEffect} from 'react'
import { fetchAllProducts } from '../api'

import {Product} from './'


const ProductList = (props) => {
    
    const {token} = props

    const [products, setProducts] = useState([])

    const fetchAndSetProducts = async () => {
        try {
            const products = await fetchAllProducts()
            setProducts(products)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchAndSetProducts()
    }, [token])

    console.log(products)

    return <div className="products-container">
        {
            products.map(product => {
                return <Product key={product.id} product={product} />
            })
        }
    </div>
}

export default ProductList