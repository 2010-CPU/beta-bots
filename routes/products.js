const productsRouter = require('express').Router()
const {getAllProducts, getProductById, createProduct} = require('../db')
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
        const destroyProduct = await destroyProduct(Number(productId))
        if (destroyProduct) {
            res.send({destroyProduct})
        }else {
            next({error: 'product not found'})
        }
    } catch (error) {
        next({error})
    }
})

module.exports = productsRouter;