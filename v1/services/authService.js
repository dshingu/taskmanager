const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Jwt = require('../../utils/jwt');
const bcrypt = require('bcrypt');

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
        const _user = await User.create({email, password, active, verified});
        if (_user) {
            const user = await User.findById(_user._id).select('-password');
            return user ? [true, user] : [false, null];
        }
        return [false, null];
    }),

    get: asyncHandler(async(id) => {

    }),

    update: asyncHandler(async(id, email, password, active, verified) => {

    }),

}