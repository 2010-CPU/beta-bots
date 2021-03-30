const ordersRouter = require('express').Router()

const {requireAdmin, requireUser} = require('./utils')

const {getAllOrders, getCartByUser, getOrderById, createOrder} = require('../db')

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
        const cart = await getCartByUser(req.user)
        if(cart) {
            res.send({cart})
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
        res.send({order})
    } catch (error) {
        next(error)
    }
})


module.exports = ordersRouter;