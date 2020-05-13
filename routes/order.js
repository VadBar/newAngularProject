const orderController = require('../controllers/order.js');
const passport = require('passport');
const express = require('express');
const router = express.Router();
router.get('/', passport.authenticate('jwt', {session: false}), orderController.getAll);
router.post('/', passport.authenticate('jwt', {session: false}), orderController.create);
module.exports = router;