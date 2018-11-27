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
    NumberOfImage: {type: Number},
    MapLongitude: {type: float},
    MapLatitude: {type: float},
    MarkerLongitude: {type: float},
    MarkerLatitude: {type: float}
});
module.exports = mongoose.model('Places', placesSchema);