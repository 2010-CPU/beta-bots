import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchOrderById} from '../api';

const Order = (props) => {
    const {token} = props;
    const { orderId } = useParams();
    const [order, setOrder] = useState({})
   
    const fetchSingleOrder = async () => {
        try {
            const order = await fetchOrderById(orderId)
            setOrder(order)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSingleOrder()
    }, [token])

    return (
        order ? <div className='order'>
            <div>Order:</div>
            <div>Order Number: {order.id}</div>
            <div>Order Status: {order.status}</div>
            <div>Order Placed: {order.datePlaced}</div>
        </div> : <div>There are no currents orders</div>
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