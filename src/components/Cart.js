import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Order } from './'


const Cart = (props) => {
    const {order, cart} = props
    return (
        <div className="shopping-cart">
            <h1>Your Shopping Cart:</h1>
            <Order order={cart} cart={true} />
        </div>
    )
}

export default Cart;