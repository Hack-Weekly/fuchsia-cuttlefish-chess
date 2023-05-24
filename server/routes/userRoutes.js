const {openPool, closePool} = require('../controller/client.js');
const express = require('express');
const router = express.Router()
const {signin, signup, selectUser, selectAllUsers, deleteUser} = require('../controller/userController');
const { User } = require('../models/user');

router.get('/signin', (req, res) => {
    try {
        const requestUser = new User(req.body.username, req.body.password);
        const user = signin(requestUser);
        res.send(user);
        if (user) {
            res.send(user);
        } else {
            res.status(500).send('Error signing up user');
        }
    } catch (error) {
        res.status(404)
    }
})

router.post('/signup', (req, res) => {
    try {
        const requestUser = new User(req.body.username, req.body.password);
        const user = signup(requestUser);
        res.send(user);
    } catch (error) {
        res.status(400)
    }
})

router.get('/:userId', (req, res) => {
    try {
        const requestUser = new User(req.params['userId']);
        const user = selectUser(requestUser);
        res.send(user);
    } catch (error) {
        res.status(400)
    }
})

router.get('/', (req, res) => {
    try {
        const user = selectAllUsers();
        res.send(user);
    } catch (error) {
        console.error(error)
        res.status(400)
    }
})

router.delete('/:id', (req, res) => {
    try {
        const requestUser = new User(req.p);
        const user = deleteUser(requestUser);
        res.send(user);
    } catch (error) {
        res.status(400).send()
    }
})

module.exports = router;
