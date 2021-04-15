const productsRouter = require('express').Router()
const {getAllProducts, getProductById, createProduct, updateProduct, getOrdersByProduct} = require('../db')
const {destroyProduct} = require('../db/products.js')
const {requireAdmin} = require('./utils')

productsRouter.get('/', async (req, res, next) => {
    try {
        const allProducts = await getAllProducts()
        res.send({allProducts})
    } catch (error) {
        next({error})
    }
})

productsRouter.get('/:productId', async (req, res, next) => {
    try {
        const {productId} = req.params
        const product = await getProductById(productId)
        if (product) {
            res.send({product})
        } else {
            next({error: "Product doesn't exist!"})
        }
    } catch (error) {
        next({error})
    }
})

productsRouter.post('/', requireAdmin, async (req, res, next) => {
    try {
        const {name, description, price, imageURL, category, inStock} = req.body;
        const productToCreate = {name, description, price, category}
        if (imageURL) {
            productToCreate.imageURL = imageURL;
        }
        if (inStock) {
            productToCreate.inStock = inStock;
        }
        const product = await createProduct(productToCreate);
        if (product) {
            res.send({product})
        } 
    } catch (error) {
        next({error})
    }
})

productsRouter.delete('/:productId', requireAdmin, async (req, res, next) => {
    try {
        const {productId} = req.params;
        console.log(productId)
        const destroyedProduct = await destroyProduct(productId)
        if (destroyedProduct) {
            res.send({destroyedProduct})
        }
    } catch (error) {
        next({error})
    }
})

productsRouter.patch('/:productId', requireAdmin, async (req, res, next) => {
    try {
        const {productId} = req.params;
        const {name, description, price, category} = req.body;
        const product = await createProduct({id: Number(productId), name, description, price, category})
        if (product) {
            res.send({product})
        }else {
            next({error: 'unable to create product'})
        }
    } catch (error) {
        next({error})
    }
})

productsRouter.get('/:productId/orders', requireAdmin, async (req, res, next) => {
    try {
        const {productId} = req.params;
        const allOrders = await getOrdersByProduct({id: Number(productId)})
        if (allOrders) {
            res.send({allOrders})
        }
    } catch (error) {
        next({error})
    }
})

module.exports = productsRouter;