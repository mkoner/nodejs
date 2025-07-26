const logEvents = require('./logEvents');

const requestLogger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'requestLog.txt');
  console.log(`${req.method} ${req.path}`);
  next();
}

module.exports = requestLogger;