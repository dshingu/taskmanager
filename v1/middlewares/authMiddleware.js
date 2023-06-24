const Jwt = require('../../utils/jwt');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

module.exports = () => {

    return asyncHandler(async(req, res, next) => {

        const {authorization} = req.headers;
        let bearer, token;

        if (!authorization) return res.status(401).json({message:'Authorization header must be present.'});

        [bearer, token] = authorization.split(' ');

        if (bearer.toLowerCase() !== 'bearer') return res.status(401).json({message:'Access denied.'});

        try {
            const payload = Jwt.VerifyAccessToken(token);
            try {
                const user = await User.findById(payload.uid);
                req.user = user;
            } catch (e) {
                return res.status(401).json({message: 'User not found.'});
            }
            
            
        }
        catch (error) {
            console.log(error.message);
        }

        next();

    });

};
