import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import {createProduct} from '../api'

import './style/createproduct.css'


const CreateProduct = (props) => {

    const {user, token} = props

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [inStock, setInStock] = useState(true)
    const [category, setCategory] = useState('')
    const [imageURL, setImageURL] = useState('')

    const history = useHistory()

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        try {
            const createdProduct = {
                name,
                price,
                description,
                category,
                inStock,
                imageURL
            }
            const product = await createProduct(token, createdProduct)
            if(product && product.id) {
                alert('Created Product')
                history.push('/')
            } else {
                alert('Incorrect Data When Creating Product')
            }
        } catch (error) {
            console.log(error)
        }
    }

    if(!token || !user.isAdmin) {
        return <div>You must be logged in to view this page.</div>
    }

    return (
        <div className="create-product">
            {/* <h2 className="create-product-header">Create Product</h2> */}
            <img id="create-product-image" src="/create_product.png"></img>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} required={true} placeholder="Product Name:" onChange={(ev) => {
                    setName(ev.target.value)
                }}></input>
                <br />
                <input type="text" value={price} required={true} placeholder="Product Price:" onChange={(ev) => {
                    setPrice(ev.target.value)
                }}></input>
                <br />
                <textarea type="text" value={description} required={true} placeholder="Description:" onChange={(ev) => {
                    setDescription(ev.target.value)
                }}></textarea>
                <br />
                <label>In Stock? 
                <input type="checkbox" checked={inStock} value={inStock} onChange={(ev) => {
                    setInStock(ev.target.value)
                }}></input>
                </label>
                <br />
                <input type="text" value={category} required={true} placeholder="Category:" onChange={(ev) => {
                    setCategory(ev.target.value)
                }}></input>
                   <br />
                <input type="text" value={imageURL} required={true} placeholder="Image URL:" onChange={(ev) => {
                    setImageURL(ev.target.value)
                }}></input>
                   <br />
                <button id="create-product-button">Submit Product</button>
            </form>
            </div>
    )

}

export default CreateProduct;


