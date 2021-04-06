import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {completeOrder, fetchCart, cancelOrder} from '../api'

import './style/checkout.css'

const Checkout = (props) => {

    const {token, user} = props

    const [cart, setCart] = useState({products: []})

    const history = useHistory()

    const fetchAndSetCart = async () => {
        try {
            const order = await fetchCart(token)
            if(order) {
                setCart(order)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleComplete = async () => {
        try {
            completeOrder(token, cart.id, {status: 'completed'})
            alert("Your order has been completed!")
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const handleCancel = async () => {
        try {
            cancelOrder(cart.id, token)
            alert("Your order has been cancelled!")
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(token) {
            fetchAndSetCart()
        }
    }, [token])

    if(!token || !cart.id) {
        return <div>You must be logged in to view checkout.</div>
    }

    return (
        <div className="checkout">
            <h2>Welcome to checkout, {user.firstName}!</h2>
            {
                cart.products.map((product) => {
                    return (
                        <div key={product.id} className="checkout-product">
                            <img src={`${product.imageURL}?${product.id}`} alt={product.name}></img>
                            <p>Name: {product.name}</p>
                            <p>${product.price}</p>
                            <p>Quantity: {product.quantity}</p>
                        </div>
                    )
                })
            }
            <h2>Total: ${cart.orderTotal}</h2>
            <button onClick={handleCancel}>Cancel Order</button>
            <button onClick={handleComplete}>Complete Order</button>
            <p>OrderId: {cart.id}</p>
            <p>Status: {cart.status}</p>
            <p>Date: {cart.datePlaced}</p>
        </div>
    )
}

export default Checkout;