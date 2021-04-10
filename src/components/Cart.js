import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom'
import { fetchCart, deleteProductFromOrder, updateOrderProduct } from '../api';

// const updateQuantity = (props) => {
//     const {token, product, fetchAndSetCart} = props
//     const {orderProductId, quantity, price} = product
//     const [updateQuantity, setQuantity] = useState(quantity)
//     const handleUpdate = async () => {
//         try {
//             const updatedOrderProduct = await updateOrderProduct(orderProductId, token, {
//                 pr
//                 product.updateQuantity
//             })
//             console.log(updatedOrderProduct)
//             fetchAndSetCart()
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     return (
//         <form className="product-quantity">
//             <label for="quantity">Quantity</label>
//             <input type="number" value={updateQuantity} onChange={(e) => setQuantity(e.target.value)} min="1" max="10"/>
//             <input type="submit" value="Submit"/>
//         </form>
//     )
// }
const UpdateCart = (props) => {
    const {fetchAndSetCart, product, token} = props
    const {orderProductId, quantity, price} = product
    const [updateQuantity, setUpdateQuantity] = useState(quantity)
    const handleEdit = async (ev) => {
        ev.preventDefault()
        try {
            const updatedPrice = price * updateQuantity
            const updatedProduct = await updateOrderProduct(orderProductId, token, {
                price: updatedPrice,
                quantity: updateQuantity
            })
            console.log(updatedProduct)
            fetchAndSetCart()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleEdit}>
            <label>Quantity:
            <input type="number" placeholder="amount" value={updateQuantity} onChange={(ev) => {
                setUpdateQuantity(ev.target.value)
            }}></input>
            </label>
            <button>Update Quantity</button>
        </form>
    )
}
const RemoveFromCart = (props) => {
    const {product, token, fetchAndSetCart} = props
    const { orderProductId } = product
    const handleDelete = async () => {
        try {
            const deletedProduct = await deleteProductFromOrder(orderProductId, token)
            fetchAndSetCart()
        } catch (error) {
            console.log(error)
        }
    }
    return (
    <button onClick={handleDelete}>Remove from Cart</button>
    )
}
const Cart = (props) => {
    const {orderId} = useParams
    const {token, product} = props
    const [order, setOrder] = useState({products: []})
    const history = useHistory()

    const fetchAndSetCart = async () => {
        try {
            const order = await fetchCart(token, orderId)
            console.log('order:', order)
            if(order){
            setOrder(order)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleCheckout = () => {
        history.push('/cart/checkout')
    }
 
    useEffect(() => {
        if (token){
        fetchAndSetCart()
        }
    }, [token])

    return (
        <div className="cart">
            <h1>My Cart</h1>
            {
                order.products.map((product) => {
                return (
                    <div className="order-product" key={product.id}>
                        <img src={`${product.imageURL} ? ${product.id}`} alt={product.name}/>   
                        <p>Product: {product.name}</p>
                        <p>Price: ${product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Total: ${product.total}</p>
                        <label>In Stock:
                        <input type="checkbox" value={true} checked={product.inStock} readOnly></input>
                        </label>
                         <p>Status: {order.status}</p>
                         <p>UserId: {order.userId}</p>
                         <p>Created: {order.datePlaced}</p>
                         <UpdateCart product={product} token={token} fetchAndSetCart={fetchAndSetCart} />
                         <RemoveFromCart token={token} product={product} fetchAndSetCart={fetchAndSetCart}/>
                        </div>
                    )
                })
            }
            <button onClick={handleCheckout} disabled={!order.products.length > 0 }>Checkout</button>
        </div>
    )
 }


export default Cart;
