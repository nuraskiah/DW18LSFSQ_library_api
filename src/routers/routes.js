const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/auth');
router.post('/login', login);
router.post('/register', register);

const { getUsers, getUser, deleteUser } = require('../controllers/user');
router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.delete('/user/:id', deleteUser);

module.exports = router;
