var express = require('express');
var router = express.Router();
var Place = require('../models/places');
var jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/placePage/:id', function (req, res, next) {

    Place.find({_id:req.params.id}, function(err, places)
    {

        res.render('place', { place: places[0] });

    });
});

router.get('/dashboard', function(req, res, next) {


    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {

            Place.find({}, function(err, places)
            {
                //res.render('dashboard', { place: places[1] });
                res.render('dashboard', { place: places });
                /*for(var i = 1; i<=places.length; i++){
                    res.render('dashboard', { place: places[i] });
                    $('.placeDiv').append('<img src = \'/images/national_park_{{place.NumberOfImage}}.jpg\' height="100" width="100" class="img-fluid" alt="Responsive image" >\n' +
                        '    <h4>{{place.Name}}</h4>');
                }*/
            });


            //res.render('dashboard');
        }
    }catch (err) {
        res.json({
            "status": "error",
            "body": [
                "You are not logged in."
            ]
        });
    }
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

router.get('/place', function(req, res, next) {
    Place.find({}, function(err, places)
    {
        res.render('place', { place: places[getRandomInt(places.length)] });

    });

});

function populatePlaces(places){


}

function verifyJwt(jwtString) {
    var value = jwt.verify(jwtString, 'CSIsTheWorst');
    return value;
}



module.exports = router;
