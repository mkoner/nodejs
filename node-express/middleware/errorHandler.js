const path = require('path');

const logEvents = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}\t${err.message}`, 'errorLog.txt');
    console.log(err.stack);
    res.status(500);
    if (req.accepts('json')) {
        res.json({ message: 'Internal Server Error' });
    } else if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, '..', 'views', '500.html'));
    }
    else {
        res.type('txt').send('Internal Server Error');
    }
}

module.exports = errorHandler;