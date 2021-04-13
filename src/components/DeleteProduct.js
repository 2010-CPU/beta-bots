import React from 'react';
import {useHistory} from 'react-router-dom';

import {destroyProduct} from '../api';

const DeleteProduct = (props) => {

    const {product, token} = props
    console.log(product)
    const {id} = product

    const history = useHistory()

    const handleDelete = async () => {
        try {
            const deleted = await destroyProduct(token, id)
            if(deleted.id) {
                alert('Deleted Product')
                history.push('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return <button onClick={handleDelete}>Delete</button>;
}

export default DeleteProduct;