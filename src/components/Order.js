import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {fetchOrderById} from '../api';


const Order = (props) => {
    const {token, user} = props;
    const { orderId } = useParams();
    const [order, setOrder] = useState({products: []})

    const history = useHistory()
   
    const fetchSingleOrder = async () => {
        try {
            const order = await fetchOrderById(orderId, token)
            if(!ownsOrder || !order) {
                history.push("/")
            } else {
                if (order) {
                    setOrder(order)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (orderId && token){
            fetchSingleOrder()
        }
    }, [token])

    if(!token) {
        return <div className="order">You must be logged in to view this page.</div>
    }

    const ownsOrder = order.userId === user.id

    return (
        <div className='order'>
            <p>Order ID: {order.id}</p>
            <p>Order Status: {order.status}</p>
            <p>User ID: {order.userId}</p>
            <p>Order Placed: {order.datePlaced}</p>
            <p>Total:?</p>
            {
                order.products.map((product) => {
                return (
                    <div className='product' key={product.id}>
                    <a href ={`products/${product.id}`}>
                    <img src={`${product.imageURL} ? ${product.id}`} />      
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <p>{product.category}</p>
                    </a>
                    </div>
                    )
                })
            }
         </div> 
    )
    
}

export default Order;


