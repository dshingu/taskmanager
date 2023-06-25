const request = require('supertest');
const asyncHandler = require('express-async-handler')
const app = require('../../app');
const Task = require('../models/Task');
const User = require('../models/User');

let auth_type, token = null;

const userObject = {
    email: 'test34@test.com',
    password: 'Password123$'
};

const taskObject = {
    title: 'Task Title',
    content: 'Task Content'
};

beforeAll(asyncHandler(async() => {
    Task.deleteMany({});
    User.deleteMany({});

    const response = await request(app)
                        .post('/auth/register')
                        .send(userObject);

  
    //expect(response.body.auth).toBe(true);
    const response2 = await request(app)
                            .post('/auth/login')
                            .send(userObject);

    auth_type = response2.body.auth_type;
    token = response2.body.token;

}));

test('Unauthenticated user should not be able to create a task', asyncHandler(async() => {

    await request(app)
            .post('/v1/tasks')
            .send({title: 'Task Title', content: 'Task Content'})
            .expect(401);

}));

test('Authenticated user should able to create a task', asyncHandler(async() => {
    
    
    await request(app)
            .post('/v1/tasks')
            .set('Authorization', `${auth_type} ${token}`)
            .send(taskObject)
            .expect(201);

}));

test('Authenticated user should able to update their task', asyncHandler(async() => {

    
    const tasksResponse = await request(app)
                                .get('/v1/tasks')
                                .set('Authorization', `${auth_type} ${token}`)
                                .send();
    
    expect(tasksResponse.statusCode).toBe(200);

    
    const taskUpdateResponse = await request(app)
            .patch(`/v1/tasks/${tasksResponse.body[0]._id}`)
            .set('Authorization', `${auth_type} ${token}`)
            .send({
                title: tasksResponse.body[0].title,
                content: tasksResponse.body[0].content,
                complete: true,
            }).expect(200);

}));

test('Authenticated user should able to delete their task', asyncHandler(async() => {

    
    const tasksResponse = await request(app)
                                .get('/v1/tasks')
                                .set('Authorization', `${auth_type} ${token}`)
                                .send();
    
    expect(tasksResponse.statusCode).toBe(200);

    
    const taskUpdateResponse = await request(app)
            .delete(`/v1/tasks/`)
            .set('Authorization', `${auth_type} ${token}`)
            .send({
                id: tasksResponse.body[0]._id
            }).expect(200);

}));