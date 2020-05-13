const positionController = require('../controllers/position.js');
const express = require('express');
const passport = require('passport');
const router = express.Router();
router.get('/:category', passport.authenticate('jwt', {session: false}), positionController.getByCategoryId);
router.post('/', passport.authenticate('jwt', {session: false}), positionController.create);
router.delete('/:idPosition', passport.authenticate('jwt', {session: false}), positionController.remove);
router.patch('/:idPosition', passport.authenticate('jwt', {session: false}), positionController.update);
module.exports = router;