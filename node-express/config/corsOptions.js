const whitelist = ['http://example1.com', 'http://example2.com']
const corsOptions = {
  origin: function (origin, callback) {
    //console.log(origin);
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
module.exports = corsOptions;