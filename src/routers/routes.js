const express = require('express');
const router = express.Router();

const { isAuth } = require('../middlewares/validateToken');

const { login, register } = require('../controllers/auth');
router.post('/login', login);
router.post('/register', register);

const { getUsers, getUser, deleteUser } = require('../controllers/user');
router.get('/users', isAuth, getUsers);
router.get('/user/:id', isAuth, getUser);
router.delete('/user/:id', isAuth, deleteUser);

module.exports = router;
