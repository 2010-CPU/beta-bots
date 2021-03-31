const orderProductsRouter = require('express').Router()

const { addProductToOrder } = require('../db')
const {requireAdmin, requireUser} = require('./utils')



orderProductsRouter.post('/:orderId/products', requireUser, async (req, res, next) => {
    const {orderId} = req.params
    try {
        const addProduct = await addProductToOrder(orderId)
        console.log("addProduct:", addProduct)
        res.send({addProduct})
    } catch (error) {
        
    }
})

module.exports = orderProductsRouter;