import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import {fetchProductById, addProductToOrder, fetchCart, updateOrderProduct, createOrder} from '../api';
import {DeleteProduct} from './'
import './style/product.css'   

const Product = (props) => {
    const {token, user} = props
    const { productId } = useParams()
    const [product, setProduct] = useState([])
    const [cart, setCart] = useState({products: []})
    const history = useHistory()

    
    const fetchSingleProduct = async () => {
        try{
            const product = await fetchProductById(productId)

            if(product) {
                setProduct(product)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchAndSetCart = async () => {
        try {
            const order = await fetchCart(token)
            if(order) {
                setCart(order)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if(productId) {
        fetchSingleProduct();
        } 
        if (token) {
            fetchAndSetCart()
        }
    }, [token, productId]);

    const handleAdd = async () => {
        try {
            if(cart.id){
                const productInCart = cart.products.find(cartProduct => {
                    return cartProduct.id === product.id
                })
                if (productInCart && productInCart.id){
                    const {orderProductId, price, total, quantity} = productInCart
                    if(quantity + 1 > 5) {
                        alert("You can't order more than 5 of a single product.")
                        return
                    }
                    const updatedTotal = Number(total + price).toFixed(2)
                    await updateOrderProduct(token, orderProductId, {price: updatedTotal, quantity: quantity + 1})
                    alert(`Increased quantity to ${quantity + 1}`)
                    fetchAndSetCart()
                } else {
                    const addProduct = await addProductToOrder(cart.id, product.id, product.price, token) 
                    fetchAndSetCart()
                    history.push("/cart")
                    alert("Added item to cart.")
                }
            } else {
                const order = await createOrder(user.id, token)
                const addProduct = await addProductToOrder(order.id, product.id, product.price, token)
                await fetchAndSetCart()
                history.push("/cart")
                alert("Added item to cart.")
            }
        } catch (error) {
            console.log(error)
        }
    }

    if(user && user.passwordReset) {
        history.push('/account/resetpassword')
    }

 return ( 
    <div className="product-container">
        <div className='product' key={product.id}>
            <div className="product-image-container">
                <img className="product-image" src={`${product.imageURL} ? ${product.id}`} alt={product.name}/>      
                <div className="product-description">{product.description}</div>
            </div>
            <div className="product-info-container">
                <div className="product-name">{product.name}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-category">{product.category}</div>
                <button className="glow-on-product" onClick={handleAdd}>Add to Cart</button>
                {
                    user && user.isAdmin ? <DeleteProduct token={token} user={user} product={product}/> : null
                } 
            </div>
        </div>
    </div>
    )
 }

export default Product;