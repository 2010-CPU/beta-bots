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
        <div className="checkout">
            <h2>Welcome to checkout, {user.firstName}!</h2>
            {
                cart.products.map((product) => {
                    return (
                        <div key={product.id} className="checkout-product">
                            <img src={`${product.imageURL}?${product.id}`} alt={product.name}></img>
                            <p>Name: {product.name}</p>
                            <p>Unit Price: ${product.price}</p>
                            <p>Quantity: {product.quantity}</p>
                            <h3>Subtotal: {product.total}</h3>
                        </div>
                    )
                })
            }
            <h2>Total: ${cart.orderTotal}</h2>
            <button onClick={handleCancel}>Cancel Order</button>
            <StripeCheckout 
                token = {handleComplete}
                stripeKey = {stripeKey}
                name = "beta-bots"
                description = "shop"
                ComponentClass = "div"
                panelLabel = "give us yo money"
                amount = {cart.orderTotal * 100}
                currency = "USD"
                locale = "en"
                billingAddress = {false}
                zipCode = {false} 
            />
            <p>OrderId: {cart.id}</p>
            <p>Status: {cart.status}</p>
            <p>Date: {cart.datePlaced}</p>
        </div>
    )
}

export default Checkout;