const {verify, sign} = require("jsonwebtoken");
const config = require('../config');


const authenticateToken = async (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).send('No token provided.');
    try {
        return  verify(token, config.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).send('Invalid token.');
            req.user = user;
            next();
        });
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
};

const generateToken = (user) => {
    return sign({ id: user.id, email: user.email }, config.JWT_SECRET, {
        expiresIn: '1w',
    });
};

module.exports = {authenticateToken, generateToken};