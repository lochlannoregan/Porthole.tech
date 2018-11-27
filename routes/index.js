var express = require('express');
var router = express.Router();

var Place = require('../models/places');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/* GET place page. */
router.get('/place', function(req, res, next) {
    Place.find({}, function(err, places)
    {
        // Generate rand number between 1 and places.length
        res.render('place', { place: places[getRandomInt(places.length)] });

    });

});

module.exports = router;

