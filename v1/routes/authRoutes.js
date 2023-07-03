const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const needsAuth = require('../middlewares/authMiddleware');
const {authValidator, resetValidator} = require('../validators/authValidator');
const validate = require('../middlewares/validationHandler');

router.route('/login')
    .post(AuthController.login);

router.route('/request-reset')
    .post(AuthController.requestReset);

router.route('/reset')
    .post([needsAuth(), validate(resetValidator)], AuthController.reset);

router.route('/reset/:token')
    .get([needsAuth()], AuthController.validateResetToken);

router.route('/register')
    .post([validate(authValidator)], AuthController.register);

router.route('/logout')
    .post(AuthController.logout);

module.exports = router;

