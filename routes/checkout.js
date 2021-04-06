require("dotenv").config()
const {STRIPE_SECRET} = process.env
const stripe = require("stripe")(STRIPE_SECRET)
const {requireUser} = require("./utils")

const checkoutRouter = require("express").Router()

checkoutRouter.post("/", requireUser, async (req, res, next) => {
    try {
        const {order, card} =  req.body
        const amount = (order.orderTotal * 100)
        const charge = await stripe.charges.create({
            amount, 
            currency: "usd",
            source: card.id
        })

        if (charge) {
            res.send({id: charge.id})
        } else {
            next({error: "Error processing payment"})
        }

    }catch (error) {
        next({error})
    }
})

module.exports = checkoutRouter