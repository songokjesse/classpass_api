const {users} = require("../db/schema");
const db = require("../db/db");
const {eq} = require("drizzle-orm");
const argon2 = require("argon2");
const {validationResult, body} = require("express-validator");
const {generateToken} = require("./authToken");


const register =
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('password')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
            .matches(/\d/).withMessage('Password must contain a number')
            .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
            .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
            .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special character'),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
        if (existingUser.length > 0) {
            return res.status(422).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await argon2.hash(password);
        const [newUser] = await db.insert(users).values({
            name,
            email,
            password: hashedPassword,
        }).returning();
        const user = { id: newUser.id, email: newUser.email, name: newUser.name };
        const token = generateToken(user);
        res.status(201).json({ token });
        // res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(422).json({ message: 'An error occurred during registration' });
    }
}
];

module.exports = register;