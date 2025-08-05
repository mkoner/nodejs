const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const notFoundHandler = require('./middleware/notFoundHandler');
const requestLogger = require('./middleware/requestLogger');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const gamesRouter = require('./routes/games');
const authRouter = require('./routes/auth');
const port = 3000;
require('dotenv').config();
const connectDB = require('./config/dbConnection');
const mongoose = require('mongoose');

connectDB();

// Custom middleware 
app.use(requestLogger);

//app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get(['/', '/index.html', '/index'], (req, res) => {
  //res.send('Hello World!')
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get(['/about.html', '/about'], (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
})

app.use('/api/games', gamesRouter);
app.use('/api/auth', authRouter);

app.use(notFoundHandler);

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
