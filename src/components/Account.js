import React, {Fragment, useEffect, useState} from 'react'

import {useHistory} from 'react-router-dom'

import {getOrdersByUser} from '../api'

import './style/account.css'

const Account = (props) => {

    const {user, token} = props

    const [orders, setOrders] = useState([])
    const [displayHistory, setDisplayHistory] = useState(true)

    const history = useHistory()
    
    const fetchAndSetHistory = async () => {
        try {
            const fetchedOrders = await getOrdersByUser(token, user.id)
            setOrders(fetchedOrders)
        } catch (error) {
            console.log(error)
        }
    }

    const handleHistoryDisplay = () => {
        if(orders && orders.length > 0) {
            setDisplayHistory(!displayHistory)
        }
    }

    useEffect(() => {
        if(token) {
            fetchAndSetHistory()
        }
    }, [token, user])

    if(user && user.passwordReset) {
        history.push('/account/resetpassword')
    }

    if(user && !user.username) {
        return <div className="profile">You must be logged in to view this page.</div>
    }

    const {username, firstName, lastName, imageURL, email, isAdmin} = user

    const styleDisplay = {
        visibility: displayHistory ? "visible" : "hidden"
    }

    return (
        <div className="account-page">
            <div className="background-image">
            <img id="divider" src="divider.png"></img>
            <h2>MY PROFILE</h2>
            <div className="account-container">
            <div className="profile">
                <p>{firstName} {lastName} ({username})</p>
                <img src={imageURL} alt={username}></img>
                <p>Email: {email}</p>
                <label>Admin: 
                <input type="checkbox" checked={isAdmin} readOnly></input>
                </label>
            </div>
            <div className="history-container">
            <h3 className="order-history-header" onClick={handleHistoryDisplay}>Order History {displayHistory ? ">" : "<"}</h3>
            <div className="order-history" style={styleDisplay}>
                {
                    orders && orders.length > 0 ? orders.map((order) => {
                        return (
                            <div className="order" key={order.id}>
                                <p>Order Id: {order.id}</p>
                                <p>Order Status: {order.status}</p>
                                <p>Order Placed: {order.datePlaced}</p>
                                {order.orderTotal > 0 ? <h4>Order Total: ${order.orderTotal}</h4> : null}
                                {order.products.length > 0 ? <p>Products Types: {order.products.length}</p> : null}
                                <ol className='product-history'>
                                {
                                    
                                    order.products.length > 0 ? order.products.map((product) => {
                                        return (
                                            <li key={product.id} className="product-in-hist">
                                                <a href={`/products/${product.id}`}>{product.name}</a>
                                                <br></br>
                                                {product.quantity > 1 ? `Ordered: ${product.quantity}` : null}
                                            </li>
                                        )
                                    }) : null
                                }
                                </ol>
                                <hr></hr>
                            </div>
                        )
                    }) : null
                }
            </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default Account;