import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import {fetchProductById, addProductToOrder, fetchCart} from '../api';
   
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
            console.log('cart/order:', order)
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

    // const handleAdd = async () => {
    //    try {
    //        // loop through cart.products to check if product.id is in cart.products// if so update quantity + 1  
    //        // orderProduct price = quantity + 1 * product.price
    //        // else 
    //        cart.products.forEach(async(cartProduct) => {
               
    //         if (cartProduct.name === product.name) {
    //        const addProduct = cartProduct.quantity = cartProduct.quantity + 1;
    //         console.log('quantity', cartProduct.quantity)
    //         console.log('addProduct', addProduct)
    //      } else {
    //              if (product && cart.id){
    //        const addProduct = await addProductToOrder(cart.id, product.id, product.price, token) 
    //        console.log('addProduct:', addProduct)
    //        history.push('/cart')
    //     }
    // }
    // })
    
    //    } catch (error) {
    //        throw error
    //    }
    // }
    const handleAdd = async () => {
        try {
        // cart.products.find(async(cartProduct) => {
        //     if (cart.id.name === product.name) {
        //        const addProduct = { 
        //         ...cartProduct,   
        //         quantity : cartProduct.quantity + 1
        //        }
        //        await addProductToOrder(cart.id, product.id, product.price, token) 
        //        fetchAndSetCart()
        //     }
       
        
            if (product && cart.id){
            const addProduct = await addProductToOrder(cart.id, product.id, product.price, token) 
            console.log('addProduct:', addProduct)
            history.push('/cart')
        }
    // })
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