import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import {fetchProductById, addProductToOrder, fetchCart} from '../api';

// orderID references orders(id)
//productId references products(id)
const Product = (props) => {
    const {token} = props
    const { productId } = useParams()
    const [product, setProduct] = useState([])
    const [cart, setCart] = useState({products: []})
    const history = useHistory()

    
    const fetchSingleProduct = async () => {
        console.log("I'm a single product")
        try{
            const product = await fetchProductById(productId)
            console.log('product:', product)
            if(product) {
                setProduct(product)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchAndSetCart = async () => {
        try {
            const order = await fetchCart(token)
            console.log('cart/order:', order)
            if(order) {
                setCart(order)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if(productId) {
        fetchSingleProduct();
        } 
        if (token) {
            fetchAndSetCart()
        }
    }, [token, productId]);

    const handleAdd = async () => {
       try {
           if (product && cart.id){
           const addProduct = await addProductToOrder(cart.id, product.id, product.price, token) 
           console.log('addProduct:', addProduct)
           history.push('/cart')
        }
       } catch (error) {
           throw error
       }
    }

 return ( 
    <div className='product' key={product.id}>
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