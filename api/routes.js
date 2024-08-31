const express = require('express')
const {authenticateToken} = require("./auth/authToken");
const login = require("./auth/login");
const register = require("./auth/register");
const logout = require("./auth/logout");
const attendance = require("./attendance/attendance");
const routes = express.Router()

routes.post('/login', login)
routes.post('/register', register)
routes.post('/logout',authenticateToken, logout)
routes.post('/attendance', attendance )
routes.get("/user", authenticateToken, (req, res) => {
    res.json(req.user);
});
module.exports = routes