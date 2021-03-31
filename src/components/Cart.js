import React, {useEffect, useState} from 'react';
import { fetchCartByUser } from '../api/orders';
import { Order } from './'

const Cart = (props) => {
    const {token, orders} = props;
    const [cart, setCart] = useState({})
    const fetchCart = async () => {
        try {
            const cart = await fetchCartByUser(token)
            console.log("cart:", cart)
            setCart(cart)
        } catch (error) {
            console.log(error)
        }
    }
 
useEffect(() => {
    fetchCart()
}, [token])
    return (
        <div className='order'>
         <h1>Your Cart</h1>
         <Order orders={orders} token={token}/>
        </div>
    // <div className='product'>
    //      <a href ={`products/${product.id}`}>
    //      <img src={`${product.imageURL} ? ${product.id}`}  />      
    //      <div>{product.name}</div>
    //      <div>{product.description}</div>
    //      <div>{product.price}</div>
    //     <div>{product.category}</div>
    //     </a>
    //  </div>  
    )
 }

export default Cart;