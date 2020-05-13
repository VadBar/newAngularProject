const analyticsController = require('../controllers/analytics.js');
const passport = require('passport');
const express = require('express');
const router = express.Router();
router.get('/overview', passport.authenticate('jwt', {session: false}), analyticsController.overview);
router.get('/analytics', passport.authenticate('jwt', {session: false}), analyticsController.analytics);
module.exports = router;