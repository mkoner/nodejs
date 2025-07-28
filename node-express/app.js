const express = require('express');
const app = express();
const cors = require('cors');

const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const notFoundHandler = require('./middleware/notFoundHandler');
const requestLogger = require('./middleware/requestLogger');
const corsOptions = require('./config/corsOptions');
const gamesRouter = require('./routes/games');
const port = 3000;


// Custom middleware 
app.use(requestLogger);


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(['/', '/index.html', '/index'], (req, res) => {
  //res.send('Hello World!')
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get(['/about.html', '/about'], (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
})

app.use('/api/games', gamesRouter);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
