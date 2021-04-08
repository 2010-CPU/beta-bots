import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom'
import { fetchCart, deleteProductFromOrder } from '../api';

const RemoveFromCart = (props) => {
    const {product, token, fetchAndSetCart} = props
    const { orderProductId} = product
    const handleDelete = async () => {
        try {
            const deletedProduct = await deleteProductFromOrder(orderProductId, token)
            fetchAndSetCart()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <button onClick={handleDelete}>Remove from Cart</button>
    )

}
const Cart = (props) => {
    const {orderId} = useParams
    const {token} = props
    const [order, setOrder] = useState({products: []})
    
    const history = useHistory()

    const fetchAndSetCart = async () => {
        try {
            const order = await fetchCart(token, orderId)
            console.log('order:', order)
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
                         <RemoveFromCart token={token} product={product} fetchAndSetCart={fetchAndSetCart}/>
                        </div>
                    )
                })
            }
            <button onClick={handleCheckout} disabled={!order.products.length > 0 }>Checkout</button>
        </div>
    )
 }


export default Cart;
