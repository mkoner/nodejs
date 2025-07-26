const express = require('express');
const app = express();
const cors = require('cors');

const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');
const port = 3000;


// Custom middleware 
app.use(requestLogger);

const whitelist = ['http://example1.com', 'http://example2.com']
const corsOptions = {
  origin: function (origin, callback) {
    //console.log(origin);
    if (origin == undefined || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

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

app.get('/old', (req, res) => {
  res.redirect(301, '/about.html');
})


// Chain handlers
const one = (req, res, next) => {
    console.log('one');
    next();
}
const two = (req, res, next) => {
    console.log('two');
    next();
}
const three = (req, res, next) => {
    console.log('three');
    res.send('Chain complete');
}

app.get('/chain', one, two, three);


app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
