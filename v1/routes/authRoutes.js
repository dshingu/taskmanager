const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const needsAuth = require('../middlewares/authMiddleware');
const authValidator = require('../validators/authValidator');
const validate = require('../middlewares/validationHandler');

router.route('/login')
    .post(AuthController.login);

router.route('/reset')
    .post([needsAuth()], AuthController.reset);

router.route('/register')
    .post([validate(authValidator)], AuthController.register);

router.route('/logout')
    .post(AuthController.logout);

module.exports = router;

