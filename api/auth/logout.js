// Logout route
const logout = async (req, res) => {
    try {
        // Return no content
        res.status(204).send();
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'An error occurred during logout.' });
    }
}

module.exports = logout;