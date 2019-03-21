var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://mongodb4670hj:lo0veq@danu7.it.nuigalway.ie:8717/mongodb4670', { useNewUrlParser: true });
exports.connection = connection;