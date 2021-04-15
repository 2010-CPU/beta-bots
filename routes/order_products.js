const orderProductsRouter = require('express').Router()

const { 
    getOrderProductById,
    getOrderById, 
    getUserById,
    updateOrderProduct,
    destroyOrderProduct
} = require('../db')

const {requireAdmin, requireUser} = require('./utils')

orderProductsRouter.patch('/:orderProductId', requireUser, async (req, res, next) => {
    try {
        const {orderProductId} = req.params
        const {price, quantity} = req.body
        const orderProduct = await getOrderProductById(orderProductId)
        const usersOrderProduct = await getOrderById(orderProduct.orderId)
        if(usersOrderProduct || req.user.isAdmin) {
            const order_product = await updateOrderProduct({id: orderProductId, price, quantity})
            if(order_product) {
                res.send({order_product})
            }
        } else {
            next({message: "You are not the owner of this order."})
        }
    } catch (error) {
        next(error)
    }
})
orderProductsRouter.delete('/:orderProductId', requireUser, async (req, res, next) => {
    const { orderProductId } = req.params  
    try {
        const orderProduct = await getOrderProductById(orderProductId)
        const order = await getOrderById(orderProduct.orderId)

        if ( req.user.id === order.userId ) {
        const deletedOrderProduct = destroyOrderProduct(orderProductId)
        res.send({deletedOrderProduct})
        } else {
            next({error: "Only users can delete their products"})
        }
    } catch (error) {
        next({error})
    }

})


module.exports = orderProductsRouter;