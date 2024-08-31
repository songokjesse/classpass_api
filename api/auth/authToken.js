const {verify} = require("jsonwebtoken");

const authenticateToken = async (req) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return null;

    try {
        return verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
};

module.exports = authenticateToken;