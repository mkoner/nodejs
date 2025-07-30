require('dotenv').config();

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'None', // Prevent CSRF attacks
    maxAge: 24 * 60 * 60 * 1000 // 1 day
};

module.exports = cookieOptions;