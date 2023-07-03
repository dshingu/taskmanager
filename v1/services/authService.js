const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Jwt = require('../../utils/jwt');
const bcrypt = require('bcrypt');
const mail = require('./Mailer');

module.exports = {

    list: asyncHandler(async() => {

    }),

    authenticate: asyncHandler(async(email, password) => {

        const user = await User.findOne({email}).exec();

        if (!user || (await user.validatePassword(password)) === false) {
            return [false, "Incorrect email/password combination."];
        }

        const payload = {uid: user._id};
        const token = Jwt.GenerateAccessToken(payload);
        user.token = token;

        await user.save();
        return [true, token];

    }),

    add: asyncHandler(async(email, password, active = true, verified = false) => {
        password = await bcrypt.hash(password, parseInt(process.env.SALT));
        const _user = await User.create({email, password, active, token: null, verified});
        if (_user) {
            const user = await User.findById(_user._id).select('-password');
            await mail([user.email], 'Welcome to TaskManager', [], user, 'auth/welcome.html');
            return user ? [true, user] : [false, null];
        }
        return [false, null];
    }),

    get: asyncHandler(async(id) => {

    }),

    update: asyncHandler(async(id, email, password, active, verified) => {

    }),

    requestReset: asyncHandler(async(email) => {
        const msg =`Instructions sent to <b>${email}</b>`;
        try {
            const user = await User.findOne({email}).select('-password').exec();
            if (!user) return [false, msg];
            user.token = Jwt.GenerateAccessToken({uid: user._id});
            await user.save();
            await mail([user.email], 'Password Reset Request', [], {app_url: process.env.APP, user}, 'auth/request-reset-token.html');
            return [true, msg];
        } catch (error) {
            console.log(error.message);
        }
        
        return [false, msg];
    }),

    resetPassword: asyncHandler(async(req) => {

        try {

            const {password} = req.body;
            await req.user.setPassword(password);
            req.user.token = null;
            await req.user.save();
            const user = req.user;
            await mail([req.user.email], 'Password Reset Complete', [], {app_url: process.env.APP, user}, 'auth/password-reset-done.html');
            return [true, 'Password update successfully'];

        } catch (error) {
            return [false, error.message];
        }

    })

}