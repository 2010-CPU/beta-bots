import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import { fetchCart } from '../api/orders';

const Cart = (props) => {
    const {token} = props
    const [order, setOrder] = useState({products: []})
    
    const history = useHistory()

    const fetchAndSetCart = async () => {
        try {
            const order = await fetchCart(token)
            if(order){
                setOrder(order)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleCheckout = () => {
        history.push('/cart/checkout')
    }
 
useEffect(() => {
    if (token){
        fetchAndSetCart()
    }
}, [token])

    console.log(order.products.length > 0)
    return (
        <div className="cart">
            <h1>My Cart</h1>
            {
                order.products.map((product) => {
                return (
                    <div className="order-product" key={product.id}>
                        <img src={`${product.imageURL} ? ${product.id}`} alt={product.name}/>   
                        <p>Product: {product.name}</p>
                        <p>Price: ${product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Total: ${product.total}</p>
                        <label>In Stock:
                        <input type="checkbox" value={true} checked={product.inStock} readOnly></input>
                        </label>
                         <p>Status: {order.status}</p>
                         <p>UserId: {order.userId}</p>
                         <p>Created: {order.datePlaced}</p>
                        </div>
                    )
                })
            }
            <button onClick={handleCheckout} disabled={!order.products.length > 0 }>Checkout</button>
        </div>
    )
 }

export default Cart;
