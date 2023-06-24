const Jwt = require('../../utils/jwt');

module.exports = () => {

    return (req, res, next) => {

        const {authorization} = req.headers;
        let bearer, token;

        if (!authorization) return res.status(401).json({message:'Authorization header must be present.'});

        [bearer, token] = authorization.split(' ');

        if (bearer.toLowerCase() !== 'bearer') return res.status(401).json({message:'Access denied.'});

        try {
            const payload = Jwt.VerifyAccessToken(token);
            req.body.payload = payload;
        }
        catch (error) {
            console.log(error.message);
        }

        next();

    }

};
