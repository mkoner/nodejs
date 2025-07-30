const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fsPromises = require('fs').promises;
const path = require('path');
require('dotenv').config();
const cookieOptions = require('../config/cookieOptions');


const usersFile = path.join(__dirname, '..', 'models', 'users.json');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const loadUsers = async () =>{
  try {
    const data = await fsPromises.readFile(usersFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err; // rethrow other errors
  }
}

const saveUsers = (users) => {
    return fsPromises.writeFile(usersFile, JSON.stringify(users, null, 2));
}

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const users = await loadUsers();
    // console.log(users);
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };
    users.push(newUser);
    
    await saveUsers(users);
    
    res.status(201).json({ message: 'User registered successfully' });
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const users = await loadUsers();
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const accessToken = jwt.sign({ username: user.username }, accessTokenSecret, { expiresIn: '5m' });
    const refreshToken = jwt.sign({ username: user.username }, refreshTokenSecret, { expiresIn: '10m' });
    user.refreshToken = refreshToken;
    await saveUsers(users);
    res.cookie('jwt', refreshToken, cookieOptions);
    res.json({ accessToken, message: 'Login successful' });
}

const refreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies || !cookies.jwt) {
        return res.sendStatus(401);
    }

    const refreshToken = cookies.jwt;
    const users = await loadUsers();
    const user = users.find(user => user.refreshToken === refreshToken);
    if (!user) {
        return res.sendStatus(403);
    }

    jwt.verify(refreshToken, refreshTokenSecret, (err, decoded) => {
        if (err || user.username !== decoded.username) {
            return res.sendStatus(403);
        }
        const accessToken = jwt.sign({ username: user.username }, accessTokenSecret, { expiresIn: '5m' });
        res.json({ accessToken });
    });
}

const logoutUser = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies || !cookies.jwt) {
        return res.sendStatus(204); // No content
    }
    const refreshToken = cookies.jwt;
    const users = await loadUsers();
    const user = users.find(user => user.refreshToken === refreshToken);
    if (user) {
        user.refreshToken = null; // Clear the refresh token
        await saveUsers(users);
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