const isLoggedIn = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: Please log in to access this endpoint." });
    }
    next();
};

module.exports = isLoggedIn;