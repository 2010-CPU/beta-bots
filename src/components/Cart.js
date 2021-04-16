import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom'
import { fetchCart, deleteProductFromOrder, updateOrderProduct } from '../api';

const UpdateCart = (props) => {
    const {fetchAndSetCart, product, token} = props
    const {orderProductId, quantity, price} = product
    const [updateQuantity, setUpdateQuantity] = useState(quantity)
    const handleUpdate = async (ev) => {
        ev.preventDefault()
        try {
            const updatedTotal = Number(updateQuantity * price).toFixed(2)
            const updatedProduct = await updateOrderProduct(token, orderProductId, {
                price: updatedTotal,
                quantity: updateQuantity
            })
            fetchAndSetCart()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form onSubmit={handleUpdate}>
            <label>Quantity
            <input type="number" placeholder="amount" min="1" max="5" value={updateQuantity} onChange={(ev) => {
                setUpdateQuantity(ev.target.value)
            }}></input>
            </label>
            <button>Update Quantity</button>
        </form>
    )
}
const RemoveFromCart = (props) => {
    const {product, token, fetchAndSetCart} = props
    const { orderProductId } = product
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
    const {token, product, user} = props
    const [order, setOrder] = useState({products: []})
    const history = useHistory()

    const fetchAndSetCart = async () => {
        try {
            const order = await fetchCart(token, orderId)
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

    if(user && user.resetPassword) {
        history.push('/account/resetpassword')
    }

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
                        <p>In Stock: {product.inStock? 'Yes' : 'Out of Stock'}</p>
                         <p>Status: {order.status}</p>
                         <p>UserId: {order.userId}</p>
                         <UpdateCart product={product} token={token} fetchAndSetCart={fetchAndSetCart} />
                         <RemoveFromCart token={token} product={product} fetchAndSetCart={fetchAndSetCart}/>
                        </div>
                    )
                })
            }
            <p>Created: {order.datePlaced}</p>
            <button onClick={handleCheckout} disabled={!order.products.length > 0 }>Checkout</button>
        </div>
    )
 }


export default Cart;
