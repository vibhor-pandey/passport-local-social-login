

var mongoose = require('mongoose');

//mongoose.Promise = global.Promise;
mongoose.Promise = require('bluebird');
//mongoose.connect('mongodb://10.7.0.3:27107/data/db');

mongoose.connect('mongodb://auth:auth@ds019956.mlab.com:19956/authenticate');
console.log("db.js started...");
module.exports = mongoose.connection;