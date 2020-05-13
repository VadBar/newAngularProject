const express = require('express');
const authController = require('../controllers/auth.js');
const router = express.Router();
router.post('/login', authController.login);
router.post('/registration', authController.registration);
module.exports = router;