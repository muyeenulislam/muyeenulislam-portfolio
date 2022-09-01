const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/login', authController.login);

// protect all routes after this middleware
router.use(authController.protect);
router.use(authController.restrictTo('admin'));
router.route('/').get(userController.getAllUsers);

module.exports = router;
