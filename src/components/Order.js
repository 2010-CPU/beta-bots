import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchOrderById} from '../api';
import Product from './Product';

const Order = (props) => {
    const {token} = props;
    const { orderId } = useParams();
    const [order, setOrder] = useState({products: []})
   
    const fetchSingleOrder = async () => {
        console.log("fetching order")
        try {
            const response = await fetchOrderById(orderId, token)
            const order = response
            console.log("order", order)
            if (order) {
            setOrder(order)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
       if (orderId){
     fetchSingleOrder()
       }
    }, [token])

    return (
            <>
        <div className='order'>
            <div>Order:</div>
            <div>Order Number: {order.id}</div>
            <div>Order Status: {order.status}</div>
            <div>Order Placed: {order.datePlaced}</div>
        </div>
        {/* <div className='products'>
            <Product product={product} token={token} />
        </div> */}
        </>
     /* <div className='product'>
        <a href ={`products/${product.id}`}>
        <img src={`${product.imageURL} ? ${product.id}`} />      
        <div>{product.name}</div>
        <div>{product.description}</div>
        <div>{product.price}</div>
        <div>{product.category}</div>
        </a>
    </div> */
    )
}

export default Order;