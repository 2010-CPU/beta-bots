require('dotenv').config();
const apiRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const {JWT_SECRET = "neverTell"} = process.env;
const {
  getUserById
} = require('../db');

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length)
    try {
      const {id} = jwt.verify(token, JWT_SECRET);
      if (id) {
        req.user = await getUserById(id)
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({error: "Authoirzation must have 'Bearer' prefix"})
  }
})

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log('user is set', req.user);
  }
  next();
})

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

const productsRouter = require('./products')
apiRouter.use('/products', productsRouter)

const usersRouter = require('./users')
apiRouter.use('/users', usersRouter);

const ordersRouter = require('./orders')
apiRouter.use('/orders', ordersRouter)

const checkoutRouter = require('./checkout')
apiRouter.use('/cart/checkout', checkoutRouter)

const orderProductsRouter = require('./order_products')
apiRouter.use('/order_products', orderProductsRouter)

apiRouter.get("*", (req, res, next) => {
  res.status(404).send({message: '404 not found'});
})

apiRouter.use((error, req, res, next) => {
  console.log(error)
  res.status(500).send(error);
})

module.exports = apiRouter;
