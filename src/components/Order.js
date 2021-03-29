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
            <div></div>
            <a href = {`orders/${order.id}`}>
            <div>Order Number: {order.id}</div>
            <div>Order Status: {order.status}</div>
            <div>Date Placed: {order.datePlaced}</div>
            <div>Customer ID: {order.userId}</div>
            </a>
        </div> : <div>There are no current orders</div>
    )
}

export default Order;