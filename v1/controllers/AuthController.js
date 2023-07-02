const asyncHandler = require('express-async-handler');
const authService = require('../services/authService');
const mail = require('../services/Mailer');

module.exports = {

    login: asyncHandler(async(req, res) => {
        const {email, password} = req.body;
        const auth = await authService.authenticate(email, password);

        return (auth[0] === true) 
            ?
             res.status(200).json({
                auth: true,
                auth_type:  'Bearer',
                token: auth[1]
            }) 
            : res.status(401).json({auth: false, message: auth[1]});

    }),

    logout: asyncHandler(async(req, res) => {
        res.status(200).json('ok');
    }),

    register: asyncHandler(async(req, res) => {
        const {email, password} = req.body;
        const user = await authService.add(email, password);
        console.log(user);
        if(user) {
            return res.status(200).json(user);
        }

        res.status(400).json({message: 'User could not be created.'});
    }),

    reset: asyncHandler(async(req, res) =>{
        res.status(200).json('ok');
    })

};