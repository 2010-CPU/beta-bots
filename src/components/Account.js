import React, {Fragment, useEffect, useState} from 'react'

import {useHistory} from 'react-router-dom'

import {getOrdersByUser} from '../api'

import './style/account.css'

const Account = (props) => {

    const {user, token} = props

    const [orders, setOrders] = useState([])

    const history = useHistory()
    
    const fetchAndSetHistory = async () => {
        try {
            const fetchedOrders = await getOrdersByUser(token, user.id)
            setOrders(fetchedOrders)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(token) {
            fetchAndSetHistory()
        }
    }, [token, user])

    if(user && user.resetPassword) {
        history.push('/account/resetpassword')
    }

    if(user && !user.username) {
        return <div className="profile">You must be logged in to view this page.</div>
    }

    const {username, firstName, lastName, imageURL, email, isAdmin} = user

    return (
        <div className="account-container">
            <div className="profile">
                <img src={imageURL} alt={username}></img>
                <p>Full Name: {firstName} {lastName}</p>
                <p>Email: {email}</p>
                <p>Username: {username}</p>
                <label>Admin: 
                <input type="checkbox" checked={isAdmin} readOnly></input>
                </label>
            </div>
            <br/>
            <h3>Order History</h3>
            <br/>
            <div className="order-history">
                {
                    orders.map((order) => {
                        return (
                            <div className="Order" key={order.id}>
                                <p>Order Id: {order.id}</p>
                                <p>Order Status: {order.status}</p>
                                <p>Order placed: {order.datePlaced}</p>
                                {order.orderTotal > 0 ? <p>Order.total: ${order.orderTotal}</p> : null}
                                {order.products.length > 0 ? <p>Products Orders: {order.products.length}</p> : null}
                                <ol className='product-history'>
                                {
                                    
                                    order.products.length > 0 ? order.products.map((product) => {
                                        return (
                                            <li key={product.id} className="product-in-hist">
                                                <a href={`/products/${product.id}`}>{product.name}</a>
                                            </li>
                                        )
                                    }) : null
                                }
                                </ol>
                                <br/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Account;