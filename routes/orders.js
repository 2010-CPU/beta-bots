const ordersRouter = require('express').Router()

const {requireAdmin, requireUser} = require('./utils')

const {
    getAllOrders, 
    getCartByUser, 
    getOrderById, 
    createOrder, 
    getOrdersByUser,
    cancelOrder,
    completeOrder,
    updateOrder,
    addProductToOrder
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
    const { id } = req.user
    try {
        const order = await getOrderById(orderId)
       
        if (order.userId === id || req.user.isAdmin) {
            res.send({order})
        } else {
            next({error: "Must be logged in, or Admin to see order"})
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

ordersRouter.patch('/:orderId', requireUser, async (req, res, next) => {
    try {
        const {orderId} = req.params
        const {status, userId} = req.body        
        req.body.id = Number(orderId)
        const objToUpdate = {
            status,
            userId,
            orderId: req.body.id
        } 
        const testOrder = await getOrderById(req.body.id)       
        if(testOrder.userId === req.user.id || req.user.isAdmin) {
            if(status === "completed") {
                const completedOrder = await completeOrder(req.body.id)
                res.send({completedOrder})
            } else {
                const order = await updateOrder(objToUpdate)
                if(order) {
                    res.send({order})
                } else {
                    next({error: "Order ID was wrong"})
                }
            }
        } else {
            next({error: "You are not authorized to do that."})
        }
    } catch (error) {
        next({error})
    }
})

ordersRouter.delete('/:orderId', requireUser, async (req, res, next) => {
    try {
        const {orderId} = req.params
        const testOrder = await getOrderById(Number(orderId))       
        if(testOrder.userId === req.user.id || req.user.isAdmin) {
            const order = await cancelOrder(Number(orderId))
            if(order) {
                res.send({order})
            } else {
                next({error: "Order ID was wrong"})
            }
        } else {
            next({error: "You are not authorized to do that."})
        }
    } catch (error) {
        next({error})
    }
})

ordersRouter.post('/:orderId/products', requireUser, async (req, res, next) => {
    const {orderId} = req.params
    const {productId, price} = req.body
    try {
        const product = await addProductToOrder({orderId, productId, price, quantity: 1})
        console.log("product router:", product)
        res.send({product})
    } catch (error) {
        next({error})
    }
})

module.exports = ordersRouter;