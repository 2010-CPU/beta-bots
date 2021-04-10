require("dotenv").config()
const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const {JWT_SECRET = "neverTell"} = process.env;
const emailValidator = require('email-validator');

const {
    createUser,
    getUserByUsername,
    getUser,
    getOrderById,
    getOrdersByUser,
    getAllUsers
} = require('../db/')

const {
    requireUser, requireAdmin
} = require('./utils');

usersRouter.post('/register', async (req, res, next) => {
    const {username, password, email, firstName, lastName, imageURL} = req.body;
    const userObj = {
        username,
        password, 
        email,
        firstName, 
        lastName
    }
    if (imageURL) {
        userObj.imageURL = imageURL
    }
    try {
        const takenUsername = await getUserByUsername(username);
        const validEmail = emailValidator.validate(email)
        // TODO: find a way to see if an email is taken.
        if (takenUsername) {
            next({message: 'A user by that username already exists.'});
        } else if (!validEmail) {
            next({message: 'Must be a valid email.'});
        } else if (password.length < 8) {
            next({message: 'Password must be a minimum of 8 characters long.'});
        } else {
            const user = await createUser(userObj)
            if (user) {
                const payload = {
                    id: user.id,
                    username: user.username
                }
                const token = jwt.sign(payload, JWT_SECRET)
                if (token) {
                    res.send({user, token})
                }
            }
        }
    } catch (error) {
        next(error);
    }
})

usersRouter.post('/login', async (req, res, next) => {
    const {username, password} = req.body;
    if (!username || !password) {
        next ({message: 'Username and password are required'});
    }
    
    try {
        const user = await getUser({username, password})
        if (user) {
            const payload = {
                id: user.id,
                username: user.username
            }
            const token = jwt.sign(payload, JWT_SECRET)
            if (token) {
                res.send({message: 'Thank you for logging in.', token});
            }
        }
    } catch (error) {
        next(error);
    }
})

usersRouter.get('/me', requireUser, (req, res, next) => {
    res.send(req.user);
})

usersRouter.get('/:userId/orders', requireAdmin, async (req, res, next) => {
    try {
        const {userId} = req.params
        if(Number(userId)){
            const orders = await getOrdersByUser({id: Number(userId)})
            if(orders) {
                res.send({orders})
            }
        } else {
            next({error: "User Id must be a number."})
        }
    } catch (error) {
        next(error)
    }
})

usersRouter.get('/', requireAdmin, async (req, res, next) => {

    try {
        const allUsers = await getAllUsers();
        if (allUsers {
            res.send({allUsers})
        }
    }catch (error) {
        next ({error})
    }
})


module.exports = usersRouter;