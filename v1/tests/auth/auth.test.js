const app = require('../../../app');
const request = require('supertest');
const asyncHandler = require('express-async-handler');
const User = require('../../models/User');

const userObject = {
    email: 'test@example.com',
    password: 'Password123$'
};

beforeAll(asyncHandler(async() => {
    await User.deleteMany({});
}));

test('User cannot signup with empty email address & empty password', asyncHandler(async() => {
    userObject.email = userObject.password = '';
    await request(app)
        .post('/auth/register')
        .send(userObject)
        .expect(400)
}));

test('User cannot signup with empty email address', asyncHandler(async() => {
    userObject.email = '';
    await request(app)
        .post('/auth/register')
        .send(userObject)
        .expect(400)
}));

test('User should not be able to register with an invalid email address', asyncHandler(async() => {
    userObject.email = 'test';
    await request(app)
        .post('/auth/register')
        .send(userObject)
        .expect(400)
}));

test('User should not be able to register with a password that contains less than 8 characters', asyncHandler(async() => {
    userObject.password = 'Pa$$w0rd'
    await request(app)
        .post('/auth/register')
        .send(userObject)
        .expect(400)
}));

test('User should not be able to register with a password that does not include a uppercase character', asyncHandler(async() => {
    userObject.password = 'Password123';
    await request(app)
        .post('/auth/register')
        .send(userObject)
        .expect(400)
}));

test('User should not be able to register with a password that does not include a lowercase character', asyncHandler(async() => {
    userObject.password = 'PASSWORD123$';
    await request(app)
        .post('/auth/register')
        .send(userObject)
        .expect(400)
}));

test('User should not be able to register with a password that does not include a numerical character', asyncHandler(async() => {
    userObject.password = 'Password!@#$';
    await request(app)
        .post('/auth/register')
        .send(userObject)
        .expect(400)
}));

test('User should not be able to register with an existing email address', asyncHandler(async() => {
    userObject.email = 'test@test.com';
    userObject.password = 'Password123$';
    const response = await request(app)
    .post('/auth/register')
    .send(userObject)
    .expect(200);

    await request(app)
    .post('/auth/register')
    .send(userObject)
    .expect(400);
}));

test('User should be able to successfully register', asyncHandler(async() => {
    userObject.email='test2@test.com';
    const response =  await request(app)
                        .post('/auth/register')
                        .send(userObject)
                        .expect(200);

    expect(response.body._id);

}));

test('User should be able to successfully login', asyncHandler(async() => {
    const response = await request(app)
                                .post('/auth/login')
                                .send(userObject);
    
    expect(response.body.auth).toBe(true);
    expect(response.body.auth_type).toBe('Bearer');
}));

