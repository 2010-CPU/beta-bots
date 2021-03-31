// import React, {useEffect, useState} from 'react';
// import {useParams} from 'react-router-dom';
// import {fetchOrderById} from '../api';
// import Product from './Product';

// const Order = (props) => {
//     const {token} = props;
//     const { orderId } = useParams();
//     const [order, setOrder] = useState({products: []})
   
//     const fetchSingleOrder = async () => {
//         console.log("fetching order")
//         try {
//             const response = await fetchOrderById(orderId, token)
//             const order = response
//             console.log("order", order)
//             if (order) {
//             setOrder(order)
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//        if (orderId){
//      fetchSingleOrder()
//        }
//     }, [token])

//     return (
//             <>
//         <div className='order'>
//             <div>Order:</div>
//             <div>Order Number: {order.id}</div>
//             <div>Order Status: {order.status}</div>
//             <div>Order Placed: {order.datePlaced}</div>
//         </div>
//         {/* <div className='products'>
//             <Product product={product} token={token} />
//         </div> */}
//         </>
//      /* <div className='product'>
//         <a href ={`products/${product.id}`}>
//         <img src={`${product.imageURL} ? ${product.id}`} />      
//         <div>{product.name}</div>
//         <div>{product.description}</div>
//         <div>{product.price}</div>
//         <div>{product.category}</div>
//         </a>
//     </div> */
//     )
// }

// export default Order;

import React, {useState, useEffect} from 'react'

import {useParams} from 'react-router-dom'

import {fetchOrderById} from '../api'

const Order = (props) => {

    const {token} = props
    const {orderId} = useParams()
    const [_order, setOrder] = useState({products: []})

    const fetchAndSetOrder = async () => {
        try {
            const order = await fetchOrderById(orderId, token)
            if(order) {
                setOrder(order)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(orderId && token) {
            fetchAndSetOrder()
        }
    }, [token])

    const total = _order && _order.products && _order.products.length > 0 ? _order.products.reduce((acc, product) => {
        return acc += product.total
    }, 0) : 0

    return( 
            <div className="Order">
                <p>Order Id: {orderId}</p>
                <p>Status: {_order.status}</p>
                <p>UserId: {_order.userId}</p>
                <p>Created: {_order.datePlaced}</p>
                <p>Total: ${total}</p>
                {
                    _order.products.map((product) => {
                        return (
                            <div className="order-product" key={product.id}>
                                <p>Product: {product.name}</p>
                                <blockquote>
                                    Price: ${product.price}
                                    <br />
                                    Quantity: {product.quantity}
                                    <br />
                                    Total: ${product.total}
                                </blockquote>                                
                                <label> In stock: 
                                <input type='checkbox' checked={product.inStock} readOnly></input>
                                </label>
                                <hr></hr>
                            </div>
                        )
                    })
                }
            </div>
    )
}

export default Order;