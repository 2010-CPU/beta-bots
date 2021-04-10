const productsRouter = require('express').Router()
const {getAllProducts, getProductById} = require('../db')

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

module.exports = productsRouter;