const categoryController = require('../controllers/category.js');
const upload = require('../midleware/upload');
const express = require('express');
const passport = require('passport');
const router = express.Router();
router.get('/', passport.authenticate('jwt', {session: false}), categoryController.getAll);
router.get('/:id', passport.authenticate('jwt', {session: false}), categoryController.getById);
router.delete('/:id', passport.authenticate('jwt', {session: false}), categoryController.remove);
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), categoryController.create);
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), categoryController.update);
module.exports = router;