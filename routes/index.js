var express = require('express');
var router = express.Router();

var Place = require('../models/places');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
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
