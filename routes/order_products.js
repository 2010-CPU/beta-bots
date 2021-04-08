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
    const { orderProductId } = req.params;
    const { price, quantity } = req.body 

    try {
        const orderProduct = await getOrderProductById(id);
        const order = await getOrderById(orderProduct.orderId)
        const user = await getUserById(order.userId)
    if (req.user.id === order.userId) {
        const updatedOrderProduct = await updateOrderProduct({id: Number(orderProductId), price, quantity})
        if(updatedOrderProduct) {
        res.send(updatedOrderProduct)
        }
    } else {
        next({error: "Only users can update their products"})
        }
    } catch (error) {
        next({error})
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