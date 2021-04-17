import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom'
import { fetchCart, deleteProductFromOrder, updateOrderProduct } from '../api';
import './style/cart.css';

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
            alert("Updated quantity to cart.")
            fetchAndSetCart()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form className="quantity-form" onSubmit={handleUpdate}>
            <label>Quantity
            <input className="quantity-box" type="number" placeholder="amount" min="1" max="5" value={updateQuantity} onChange={(ev) => {
                setUpdateQuantity(ev.target.value)
            }}></input>
            </label>
            <button id="update-quantity" className="update-cart">Update Quantity</button>
        </form>
    )
}
const RemoveFromCart = (props) => {
    const {product, token, fetchAndSetCart} = props
    const { orderProductId } = product
    const handleDelete = async () => {
        try {
            const deletedProduct = await deleteProductFromOrder(orderProductId, token)
            alert("Removed item from cart.")
            fetchAndSetCart()            
        } catch (error) {
            console.log(error)
        }
    }
    return (
    <button onClick={handleDelete} className="remove-from-cart">Remove from Cart</button>
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

    if(user && user.passwordReset) {
        history.push('/account/resetpassword')
    }

    if(!order || order.products && order.products.length === 0) {
        return (
            <div className="empty-cart">
                Your cart is empty! :&#40;
            </div>
        )
    }

    return (
        <div className="cart">
            <img id="your-cart-logo" src="your-cart.png"></img>
            {
                order.products.map((product) => {
                return (
                    <div className="order-product" key={product.id}>
                        <h3 className="product-name"> {product.name}</h3>
                        <img src={`${product.imageURL} ? ${product.id}`} alt={product.name}/>                       
                        <p className="price">Price: ${product.price}</p>
                        <p className="quantity">Quantity: {product.quantity}</p>
                        <p className="total">Total: ${product.total}</p>
                        <p className="in-stock">In Stock: {product.inStock? 'Yes' : 'Out of Stock'}</p>
                         <p className="status">Status: {order.status}</p>
                         <p className="userid">User Id: {order.userId}</p>
                         <UpdateCart product={product} token={token} fetchAndSetCart={fetchAndSetCart}/>
                         <RemoveFromCart token={token} product={product} fetchAndSetCart={fetchAndSetCart}/>
                        </div>
                    )
                })
            }
            {order && order.status ? <p className="created">Created: {order.datePlaced}</p> : null}
            <div id="checkout-button-div"><button onClick={handleCheckout} disabled={!order.products.length > 0 } className="cart-checkout">Checkout</button></div>
            <img id="music-notes" src="/music-notes.jpeg"></img>
        
        </div>
    )
 }


export default Cart;
