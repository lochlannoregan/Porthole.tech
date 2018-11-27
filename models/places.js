var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');
var placesSchema = new Schema({
    Name: {type: String},
    Category: {type: String},
    Length: {type: String},
    Grade: {type: String},
    EstimatedTime: {type: String},
    Likes: {type: String},
    NumberOfImage: {type: Number}
});
module.exports = mongoose.model('Places', placesSchema);