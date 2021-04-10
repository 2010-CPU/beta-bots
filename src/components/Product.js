import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import {fetchProductById, addProductToOrder, fetchCart, updateOrderProduct} from '../api';
   
const Product = (props) => {
    const {token} = props
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
                const updatedTotal = Number(total + price).toFixed(2)
                await updateOrderProduct(token, orderProductId, {price: updatedTotal, quantity: quantity + 1})
            } else {
                const addProduct = await addProductToOrder(cart.id, product.id, product.price, token) 
                fetchAndSetCart()
            }
        }
        } catch (error) {
            console.log(error)
        }
    }

 return ( 
    <div className='product' key={product.id}>
        <img src={`${product.imageURL} ? ${product.id}`} alt={product.name}/>      
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <p>{product.category}</p>
        <button onClick={handleAdd}>Add to Cart</button>
    </div>
    )
 }

export default Product;