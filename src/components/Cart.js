import React, {useEffect, useState} from 'react';
import { fetchCart } from '../api/orders';

const Cart = (props) => {
    const {token} = props
    const [order, setOrder] = useState({products: []})
   
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
 
useEffect(() => {
    if (token){
    fetchAndSetCart()
    }
}, [token])

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
            </div>
    )
 }

export default Cart;
