const express = require('express');
const router = express.Router();

// Register auth route
router.use('/auth', require('./authRoutes'));

module.exports = router;