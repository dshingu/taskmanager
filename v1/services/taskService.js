const Task = require('../models/Task');
const asyncHandler = require('express-async-handler');

module.exports = {


    list: asyncHandler(async(req) => {

        let tasks = [];

        try {
            tasks = await req.user.populate('tasks');
            return [true, req.user.tasks]
        } catch (error) {
            console.log(error);
        }
        
        return [false, {message: 'Error fetching tasks.'}];
    }),

    add: asyncHandler(async(req) => {

        try {
            const task = await Task.create({
                ...req.body,
                uid: req.user._id
            });
            return [true, task];
        } catch (error) {
            console.log(error);
        }

        return [false, {message: 'Error creating Task.'}];

    }),

    get: asyncHandler(async(id) => {

        try {

            const task = await Task.findById(id);
            return [true, task];

        } catch (error) {
            console.log(error);
        }

        return [false, {message: 'Task could not be found.'}]

    }),

    update: asyncHandler(async(req) => {

        try {

            const{title, content, complete} = req.body;
            let completed_at = null;

            if (complete === 'true' || complete == true) {
                completed_at = new Date();
            }

            const task = await Task.findById({_id:req.params.id});
            task.title = title;
            task.content = content;
            task.complete = complete;
            task.completed_at = completed_at;
            await task.save();
            
            return [true, task];

        } catch (error) {
            console.log(error);
        }

        return [false, {message: 'Error updating task.'}];

    }),

    remove: asyncHandler(async(id) => {

        try {

            const task = await Task.findById(id);
            const deletedTask = await task.deleteOne();
            return [true, deletedTask];
       
        } catch (error) {
            console.log(error);
        }
        
        return [false, {message: 'Error removing task.'}]

    }),




}