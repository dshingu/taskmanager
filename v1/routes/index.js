const express = require('express');
const router = express.Router();

// Register auth route
router.use('/auth', require('./authRoutes'));
router.use('/v1/tasks', require('./taskRoutes'));

module.exports = router;