const express = require('express');
const router = express.Router();

const { login } = require('../controllers/auth');
router.post('/login', login);

module.exports = router;
