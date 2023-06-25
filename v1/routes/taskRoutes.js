const express = require('express');
const router = express.Router();
const TasksController = require('../controllers/TasksController');
const needsAuth = require('../middlewares/authMiddleware')


router.route('/')
    .post([needsAuth()], TasksController.create)
    .delete([needsAuth()], TasksController.delete)
    .get([needsAuth()], TasksController.index);

router.route('/:id')
    .patch([needsAuth()], TasksController.update)
    .get([needsAuth()], TasksController.read);


module.exports = router;

 