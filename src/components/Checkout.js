import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {completeOrder, fetchCart, cancelOrder, checkoutRequest} from '../api'
import StripeCheckout from 'react-stripe-checkout'

import './style/checkout.css'

const Checkout = (props) => {

    const {token, user} = props

    const [cart, setCart] = useState({products: []})

    const history = useHistory()
    const stripeKey = 'pk_test_51IbtfnKGAVud5ybh068WIDHdg0laPEWS2EPE2ZmOsluLgsTnyTL5gOz7egGriuBsaaXvn6etd4QqbqJ6BZwIjnyu00wGGBbjev'

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

    const handleComplete = async (card) => {
        try {
            const response = await checkoutRequest(token, cart, card)
            if(response.id) {
                await completeOrder(token, cart.id, {status: 'completed'})
                history.push('/')
                alert("Your order has been completed!")
            } else {
                alert("Issue with payment system.")
            }
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

    if(user && user.passwordReset) {
        history.push('/account/resetpassword')
    }

    if(!token || !cart.id) {
        return <div>You must be logged in to view checkout.</div>
    }

    return (

        <div className="checkout-container">
            <h2 id="checkout-header">CHECKOUT</h2>
            {
                cart.products.map((product) => {
                    return (
                        <div key={product.id} className="checkout-product">
                            <h2 id="header-name-product">{product.name}</h2>
                            <img id="prod-image" src={`${product.imageURL}?${product.id}`} alt={product.name}></img>
                            <p id="unit-price">Unit Price: ${product.price}</p>
                            <p id="unit-quantity">Quantity: {product.quantity}</p>
                            <h3 id="subtotal">Subtotal: ${product.total}</h3>
                        </div>
                    )
                })
            }
            <div class="stripe-container">
            <div><img id="dividerer" src="/divider.png"></img></div>
            <h2 id="your-cart">{user.firstName}'s CART <img id="shopping-cart" src="/shopping-cart.png"></img></h2>
            <p id="order-number">Order #: {cart.id}</p>
            <p id="order-status">Status: {cart.status}</p>
            <p id="order-date">Date: {cart.datePlaced}</p>
            <h2 id="total-price"><u>Total: ${cart.orderTotal}</u></h2>
            <StripeCheckout
                token = {handleComplete}
                stripeKey = {stripeKey}
                name = "Beta Bots"
                description = "Music Shop"
                ComponentClass = "div"
                panelLabel = "Pay"
                amount = {cart.orderTotal * 100}
                currency = "USD"
                locale = "en"
                billingAddress = {false}
                zipCode = {false} > <button id="stripe-button">Pay With Card</button> 
            </StripeCheckout>
            <button id="cancel-button" onClick={handleCancel}>Cancel Order</button>
            <div><img id="dividerer" src="/divider.png"></img></div>
            </div>
        </div>
    )
}

export default Checkout;