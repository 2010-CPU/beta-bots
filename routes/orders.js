const ordersRouter = require('express').Router()

const {requireAdmin, requireUser} = require('./utils')

const {
    getAllOrders, 
    getCartByUser, 
    getOrderById, 
    createOrder, 
    getOrdersByUser
} = require('../db')

ordersRouter.get('/', requireAdmin ,async (req, res, next) => {
    try {
        const orders = await getAllOrders()
        if(orders) {
            res.send({orders})
        }
    } catch (error) {
        next(error)
    }
})

ordersRouter.get('/cart', requireUser, async (req, res, next) => {
    try {
        const order = await getCartByUser(req.user)
        if (order){
            res.send({order}) 
        }
    } catch (error) {
        next(error)
    }
})

ordersRouter.post('/', requireUser, async (req, res, next) => {
    try {
        const order = await createOrder(req.body)
        if(order) {
            res.send({order})
        }
    } catch (error) {
        next(error)
    }
})

ordersRouter.get('/:orderId', requireUser, async (req, res, next) => {
    const {orderId} = req.params
    try {
        const order = await getOrderById(orderId)
        if (order) {
        res.send({order})
        } else {
            throw new Error (`order ${orderId} not found`)
        }
    } catch (error) {
        next(error)
    }
})
ordersRouter.get('/:userId/orders', requireAdmin, async (req, res, next) => {
    try {
        const {userId} = req.params
        const orders = await getOrdersByUser({id: userId})
        if(orders) {
            res.send({orders})
        }
    } catch (error) {
        next(error)
    }
})

module.exports = ordersRouter;