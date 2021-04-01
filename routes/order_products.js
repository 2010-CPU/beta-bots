const orderProductsRouter = require('express').Router()

const { addProductToOrder } = require('../db')
const {requireAdmin, requireUser} = require('./utils')



orderProductsRouter.post('/:orderId/products', requireUser, async (req, res, next) => {
    const {orderId} = req.params
    const {productId, price, quantity} = req.body
    try {
        const addProduct = await addProductToOrder(orderId, productId, price, quantity)
        res.send({addProduct})
    } catch (error) {
        
    }
})

orderProductsRouter.patch('/order_products/:orderProductId', requireUser, async (req, res, next) => {

})

module.exports = orderProductsRouter;