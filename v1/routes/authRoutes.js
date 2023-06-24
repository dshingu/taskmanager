const express = require('express');
const AuthController = require('../controllers/AuthController');
const needsAuth = require('../middlewares/authMiddleware');
const router = express.Router();


router.route('/login')
    .post(AuthController.login);

router.route('/reset')
    .post([needsAuth()], AuthController.reset);

router.route('/register')
    .post(AuthController.register);

module.exports = router;

