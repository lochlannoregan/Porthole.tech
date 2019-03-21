var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');
var placesSchema = new Schema({
    Name: {type: String},
    Description: {type: String},
    ImageLocation: {type: String},
    SoundLocation: {type: String},
    Latitude: {type: Number},
    Longitude: {type: Number}
});
module.exports = mongoose.model('Places', placesSchema);