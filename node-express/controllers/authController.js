const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieOptions = require('../config/cookieOptions');
const permissions = require('../config/permissions');
const User = require('../models/user');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;


const registerUser = async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const newPermissions = req.body.permissions || ['READ_GAME'];

    if (!Array.isArray(newPermissions) || !newPermissions.every(p => Object.keys(permissions).includes(p))) {
        return res.status(400).json({ message: 'Invalid permissions' });
    }
    const existingUser = await User.findOne({ username }).exec();
    if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, password: hashedPassword };
        newUser.permissions = newPermissions;
        const result = await User.create(newUser);
        console.log(`User created: ${result}`);
        res.status(201).json({ message: `User ${result.username} registered successfully` });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ username }).exec();
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const accessToken = jwt.sign({ 
        username: user.username,
        permissions: user.permissions.map(permission => permissions[permission])
        }, 
        accessTokenSecret, { expiresIn: '5m' });
    const refreshToken = jwt.sign({ username: user.username }, refreshTokenSecret, { expiresIn: '10m' });
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie('jwt', refreshToken, cookieOptions);
    res.json({ accessToken, message: 'Login successful' });
}

const refreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies || !cookies.jwt) {
        return res.sendStatus(401);
    }

    const refreshToken = cookies.jwt;
    const user = await User.findOne({ refreshToken }).exec();
    if (!user) {
        return res.sendStatus(403);
    }

    jwt.verify(refreshToken, refreshTokenSecret, (err, decoded) => {
        if (err || user.username !== decoded.username) {
            return res.sendStatus(403);
        }
        const accessToken = jwt.sign({ 
            username: user.username,
            permissions: user.permissions.map(permission => permissions[permission])
            }, 
            accessTokenSecret, { expiresIn: '5m' });
        res.json({ accessToken });
    });
}

const logoutUser = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies || !cookies.jwt) {
        return res.sendStatus(204); // No content
    }
    const refreshToken = cookies.jwt;
    const user = await User.findOne({ refreshToken }).exec();
    if (user) {
        user.refreshToken = null; // Clear the refresh token
        await user.save();
    }
    res.clearCookie('jwt', cookieOptions); 
    res.sendStatus(204);
}

module.exports = {
    registerUser,
    loginUser,
    refreshToken,
    logoutUser
};