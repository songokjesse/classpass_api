const express = require('express')
const authenticateToken = require("./auth/authToken");
const router = express.Router()



router.get("/user", authenticateToken, (req, res) => {
    res.json(req.user);
});
module.exports = router