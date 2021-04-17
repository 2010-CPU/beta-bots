require("dotenv").config()
const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const {JWT_SECRET = "neverTell"} = process.env;
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const {
    createUser,
    getUserByUsername,
    getUser,
    getOrderById,
    getOrdersByUser,
    getAllUsers,
    updateUser,
    getUserById,
    forcePasswordReset,
    handledPasswordReset
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

usersRouter.get('/:userId/orders', requireUser, async (req, res, next) => {
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
        if (allUsers) {
            res.send({allUsers})
        }
    }catch (error) {
        next ({error})
    }
})

usersRouter.patch('/resetpassword', requireAdmin, async (req, res, next) => {
    try {
        const {userId} = req.body
        const user = await forcePasswordReset(userId)
        if(user) {
            res.send({user})
        } else {
            next({message: "Error forcing password reset."})
        }
    } catch (error) {
        next({error})
    }
})

usersRouter.patch('/confirmedpassword', requireUser, async (req, res, next) => {
    try {
        const {userId, password} = req.body
        const testUser = await getUserById(userId)
        if(req.user.id === testUser.id) {
            const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
            const user = await handledPasswordReset(userId, hashedPassword)
            if(user) {
                res.send({user})
            } else {
                next({message: "User doesn't exist."})
            }
        } else {
            next({message: "You are not the user in the database."})
        }
    } catch (error) {
        next({error})
    }
})

usersRouter.patch('/:userId', requireAdmin, async (req, res, next) => {
    try {
        const {userId} = req.params;
        const {firstName, lastName, email, isAdmin, imageURL} = req.body;
        const user = await updateUser ({id: userId, firstName, lastName, email, isAdmin, imageURL})
        if (user) {
            res.send({user})
        }
    } catch (error) {
        next({error})
    }
})



usersRouter.get('/:userId', requireAdmin, async (req, res, next) => {
    try {
        const {userId} = req.params;
        const user = await getUserById(Number(userId))
        if (user) {
            res.send({user})
        }
    } catch (error) {
        next({error})
        
    }
})

usersRouter.post('/', requireAdmin, async (req, res, next) => {
    try {
        const user = await createUser(req.body)
        if(user) {
            console.log(user)
            res.send({user})
        }
    } catch (error) {
        next({error})
    }
})

module.exports = usersRouter;