const app = require('../../../app');
const request = require('supertest');
const asyncHandler = require('express-async-handler');

const userObject = {
    email: 'test@example.com',
    password: 'Password123$'
};

beforeAll(asyncHandler(async() => {

}));

test('User cannot signup with empty email address & empty password', asyncHandler(async() => {
    await request(app)
        .post('/auth/register')
        .send(userObject)
        .expect(400)
}));

test('User cannot signup with empty email address', asyncHandler(async() => {
    await request(app)
        .post('/auth/register')
        .send(userObject)
        .expect(400)
}));

test('User should not be able to register with an invalid email address', asyncHandler(async() => {
    await request(app)
        .post('/auth/register')
        .send(userObject)
        .expect(400)
}));

test('User should not be able to register with a password that contains less than 8 characters', asyncHandler(async() => {
    await request(app)
        .post('/auth/register')
        .send(userObject)
        .expect(400)
}));

test('User should not be able to register with a password that does not include a uppercase character', asyncHandler(async() => {
    await request(app)
        .post('/auth/register')
        .send(userObject)
        .expect(400)
}));

test('User should not be able to register with a password that does not include a lowercase character', asyncHandler(async() => {
    await request(app)
        .post('/auth/register')
        .send(userObject)
        .expect(400)
}));

test('User should not be able to register with a password that does not include a numerical character', asyncHandler(async() => {
    await request(app)
        .post('/auth/register')
        .send(userObject)
        .expect(400)
}));


test('User should not be able to register with an existing email address', asyncHandler(async() => {
    await request(app)
        .post('/auth/register')
        .send(userObject)
        .expect(200);
    
        await request(app)
        .post('/auth/register')
        .send(userObject)
        .expect(400);
}));

test('User should be able to successfully register', asyncHandler(async() => {
    const response =  await request(app)
                        .post('/auth/register')
                        .send(userObject)
                        .expect(200);

    expect(response.body._id);

}));

