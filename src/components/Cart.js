import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Order } from './Order'


const Cart = () => {
    const [cart, setCart]
    return (
        <div className="shopping-cart">
            <h1>Your Shopping Cart:</h1>
            <Order />
        </div>
    )

}

export default Cart;