const path = require('path');

const logEvents = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}\t${err.message}`, 'errorLog.txt');
    console.log(err.stack);
    res.status(500).sendFile(path.join(__dirname, '..', 'views', '500.html'));
}

module.exports = errorHandler;