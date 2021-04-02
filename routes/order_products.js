const orderProductsRouter = require('express').Router()

const { 
    addProductToOrder, 
    getOrderProductById,
    getOrderById, 
    getUserById,
    updateOrderProduct,
    destroyOrderProduct
} = require('../db')

const {requireAdmin, requireUser} = require('./utils')


orderProductsRouter.post('/:orderId/products', requireUser, async (req, res, next) => {
    const {orderId} = req.params
    const {productId, price, quantity} = req.body
    try {
        const addProduct = await addProductToOrder(orderId, productId, price, quantity)
        res.send({addProduct})
    } catch (error) {
        console.log(error)
    }
})

orderProductsRouter.patch('/order_products/:orderProductId', requireUser, async (req, res, next) => {
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
        throw new Error("Only the user can update their order")
        }
    } catch (error) {
        console.log(error)
    }
})

orderProductsRouter.delete('/order_products/:orderProductId', requireUser, async (req, res, next) => {
    const { orderProductId } = req.params  
    try {
        const orderProduct = await getOrderProductById(orderProductId)
        const order = await getOrderById(orderProduct.orderId)
        const user = await  getOrdersByUser(order.userId)

        if ( req.user.id === order.userId ) {
        const deletedOrderProduct = destroyOrderProduct(orderProductId)
        res.send(deletedOrderProduct)
        } else {
            throw new Error ('Only account users can delete their order products')
        }
    } catch (error) {
        console.log(error)
    }

})


module.exports = orderProductsRouter;