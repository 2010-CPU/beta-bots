import React, {useEffect, useState} from 'react';
import { fetchCart } from '../api/orders';
import { Product } from './Product'

const Cart = (props) => {
    const {token} = props;
    const [order, setOrder] = useState({products: []})

    const fetchAndSetCart = async (token) => {
        console.log("cart")
        try {
            const order = await fetchCart(token)
            if(order){
            console.log("order:", order)
            // setCart(cart)
            setOrder(order)
            }
        } catch (error) {
            console.log(error)
        }
    }
 
useEffect(() => {
    if (token && order){
    fetchAndSetCart()
    }
}, [token])
    return (
        <div className="cart">
         <h1>Your Cart</h1>
         {
            order.products.map((product) => {
                return (
                    <div className="order-product" key={product.id}>
                         <p>Status: {order.status}</p>
                    <p>UserId: {order.userId}</p>
                    <p>Created: {order.datePlaced}</p>
                        <img src={`${product.imageURL} ? ${product.id}`} alt={product.name}/>   
                        <p>Product: {product.name}</p>
                        <p>Price: ${product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Total: ${product.total}</p>
                        <label>In Stock:
                        <input type="checkbox" value={true} checked={product.inStock} readOnly></input>
                        </label>
                         {/* <p>Status: {order.status}</p>
                         <p>UserId: {order.userId}</p>
                         <p>Created: {order.datePlaced}</p> */}
                        </div>
                    )
                })
         }
            </div>
    )
 }

export default Cart;

// const Cart = (props) => {
//     const {token} = props
//     const [order, setOrder] = useState({products: [] })
//     const [total, setTotal] = useState(0)
//     const fetchAndSetCart = async () => {
//         try {
//             const order = await fetchCart(token)
//             if(order) {
//                 const generatedTotal = order && order.products && order.products.length > 0 ? order.products.reduce((acc, product) => {
//                     return acc += product.total
//                 }, 0).toFixed(2) : 0
//                 setTotal(generatedTotal)
//                 setOrder(order)
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     useEffect(() => {
//         if(token) {
//             fetchAndSetCart()
//         }
//     }, [token])

//     return (
//         <div className="cart">
//             <h2>My Cart</h2>
//                 {
//                     order.products.map((product) => {
//                         return (
//                             <div className="order-product" key={product.id}>
//                                 <div className="product-info">
//                                 <img src={`${product.imageURL}?${product.id}`} alt={product.name}></img>
//                                 <p>Product: {product.name}</p>
//                                 <blockquote>
//                                     Price: ${product.price}
//                                     <br />
//                                     Quantity: {product.quantity}
//                                     <br />
//                                     Subtotal: ${product.total}
//                                 </blockquote>                                
//                                 <label> In stock: 
//                                 <input type='checkbox' defaultValue={product.inStock} checked={product.inStock} readOnly></input>
//                                 </label>
//                                 </div>
//                                 </div>
//                         )
//                     })
//                 }
//                 <h3>Total: ${total}</h3>
//                 <p>Status: {order.status}</p>
//                 <p>UserId: {order.userId}</p>
//                 <p>Created: {order.datePlaced}</p>
//         </div>
//     )
// }

// export default Cart;