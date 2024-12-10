const express = require('express')
const router = express.Router()

router.post('/auth', async (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' & password === 'admin') {
        
        return res.json({ message: 'Hi admin' });
        
    }
    res.status(401).json({ message: 'Invalid username or password' });
});

module.exports = router