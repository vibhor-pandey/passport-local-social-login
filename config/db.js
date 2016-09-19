

var mongoose = require('mongoose');

//mongoose.Promise = global.Promise;
mongoose.Promise = require('bluebird');
//mongoose.connect('mongodb://10.7.0.3:27107/data/db');

mongoose.connect('mongodb://<mlab_bd_name>:<mlab_db_password>@ds019956.mlab.com:19956/authenticate');
console.log("db.js started...");
module.exports = mongoose.connection;
