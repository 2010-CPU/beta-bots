const ordersRouter = require('express').Router()

const {requireAdmin, requireUser} = require('./utils')

const {
    getAllOrders, 
    getCartByUser, 
    getOrderById, 
    createOrder, 
    getOrdersByUser
} = require('../db')
const { user } = require('../db/client')

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
    const { id } = req.user
    try {
        const order = await getOrderById(orderId)
        console.log("Order:", order)
        if (order.userId === id || req.user.isAdmin) {
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