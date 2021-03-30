import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Order } from './'


const Cart = () => {

    return (
        <div className="shopping-cart">
            <h1>Your Shopping Cart:</h1>
            <Order />
        </div>
    )
}

export default Cart;