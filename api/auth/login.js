const {users} = require("../db/schema");
const db = require("../db/db");
const {eq} = require("drizzle-orm");
const argon2 = require("argon2");
const config = require("../config");
const {sign} = require("jsonwebtoken");
const {body, validationResult} = require("express-validator");

const login = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Invalid password'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
    const { email, password } = req.body;
    try {
        const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (!user || !(await argon2.verify(password, user.password))) {
            return res.status(422).json({ message: 'Invalid credentials' });
        }

        const token = sign({ id: user.id, email: user.email }, config.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(422).json({ message: 'An error occurred during login' });
    }
}];


module.exports = login