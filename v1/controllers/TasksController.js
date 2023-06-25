const asyncHandler = require('express-async-handler');
const taskService = require('../services/taskService');


module.exports = {

    index: asyncHandler(async(req, res) => {

        const tasks = await taskService.list(req);
        
        return tasks[0] === true ?
            res.status(200).json(tasks[1]):
            res.status(400).json(tasks[1]);

    }),

    create: asyncHandler(async(req, res) => {
        const task = await taskService.add(req);
        return (task[0] === true) ? 
            res.status(201).json(task[1]): 
            res.status(400).json(task[1]);

    }),

    read: asyncHandler(async(req, res) => {

        const task = await taskService.get(req.params.id);

        return task[0] === true ?
            res.status(200).json(task[1]):
            res.status(400).json(task[1]);
    
    }),

    update: asyncHandler(async(req, res) => {
        const task = await taskService.update(req);
        return (task[0] === true) ?
            res.status(200).json(task[1]):
            res.status(400).json(task[1]);
    }),

    delete: asyncHandler(async(req, res) => {
        const deletedTask = await taskService.remove(req.body.id);
        return (deletedTask[0] === true) ?
            res.status(200).json(deletedTask[1]):
            res.status(400).json(deletedTask[1]);
    })

};