import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchOrderById} from '../api';

const Order = (props) => {
    const {token} = props;
    const { orderId } = useParams();
    const [order, setOrder] = useState({products: []})
   
    const fetchSingleOrder = async () => {
        try {
            const _order = await fetchOrderById(orderId, token)
            console.log("order:",_order)
            setOrder(_order)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log('token:', token)
       if (orderId){
     fetchSingleOrder()
       }
    }, [token])

    return (
        <div className='order'>
            <div>Order:</div>
            <div>Order Number: {order.id}</div>
            <div>Order Status: {order.status}</div>
            <div>Order Placed: {order.datePlaced}</div>
        </div>
    /* <div className='product'>
        <a href ={`products/${product.id}`}>
        <img src={`${product.imageURL} ? ${product.id}`} />      
        <div>{product.name}</div>
        <div>{product.description}</div>
        <div>{product.price}</div>
        <div>{product.category}</div>
        </a>
    </div>  */
    )
}

export default Order;