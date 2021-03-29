const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;
const emailValidator = require('email-validator');

const {
    createUser,
    getUserByUsername,
    getUser
} = require('../db/')

const {
    requireUser
} = require('./utils');




usersRouter.post('/register', async (req, res, next) => {
    const {username, password, firstName, lastName, email} = req.body;
    try {
        const takenUsername = await getUserByUsername(username);
        const validEmail = emailValidator.validate(email)
        // TODO: find a way to see if an email is taken.
        if (takenUsername) {
            next ({message: 'A user by that username already exists.'});
        } else if (!validEmail) {
            next ({message: 'Must be a valid email.'});
        } else if (password.length < 8) {
            next ({message: 'Password must be a minimum of 8 characters long.'});
        } else {
            const user = await createUser({username, password, firstName, lastName, email})
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

usersRouter.get('/me', requireUser, async (req, res, next) => {
    res.send(req.user);
})


module.exports = usersRouter;