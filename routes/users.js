var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Place = require('../models/places')
var jwt = require('jsonwebtoken');

router.get('/register', function (req, res, next) {
    res.render('register');
});

router.get('/login', function (req, res, next) {
    res.render('login');
});


// Compares passwords to determine if the user is who they say they are
router.post('/register', function (req, res, next) {
    var username = req.body.user_name;
    var password = req.body.password;
    // Check if account already exists
    User.findOne({'user_name': username}, function (err, user) {
        if (err)
            res.send(err);
        // check to see if theres already a user with that email
        if (user) {
            res.status(401).json({
                "status": "info",
                "body": "Username already taken"
            });
        } else {
            // If there is no user with that username create the user
            var newUser = new User();

            // set the user's local credentials
            newUser.user_name = username;
            newUser.password = newUser.generateHash(password);
            newUser.access_token = createJwt({user_name: username});
            newUser.save(function (err, user) {
                if (err)
                    throw err;
                res.cookie('Authorization', 'Bearer ' + user.access_token);
                res.json({'success': 'account created'});

            });
        }
    });
});

router.post('/addPlace', function (req, res, next) {
    var name = req.body.Name;
    var category = req.body.Category;
    var length = req.body.Length;
    var grade = req.body.Grade;
    var estimatedTime = req.body.EstimatedTime;
    var likes = req.body.Likes;
    var numberOfImage = req.body.NumberOfImage;
    var mapLongitude = req.body.MapLongitude;
    var mapLatitude = req.body.MapLatitude;
    var markerLongitude = req.body.MarkerLongitude;
    var markerLatitude = req.body.MarkerLatitude;

    var newPlace = new Place();
    newPlace.Name = name;
    newPlace.Category = category;
    newPlace.Length = length;
    newPlace.Grade = grade;
    newPlace.EstimatedTime = estimatedTime;
    newPlace.Likes = likes;
    newPlace.NumberOfImage = numberOfImage;
    newPlace.MapLongitude = mapLongitude;
    newPlace.MapLatitude = mapLatitude;
    newPlace.MarkerLongitude = markerLongitude;
    newPlace.MarkerLatitude = markerLatitude;

    newPlace.save(function (err, savedPlace) {
        if (err)
            throw err;
        res.json({
            "id": savedPlace._id
        });
    })


})

function createJwt(profile) {
    return jwt.sign(profile, 'CSIsTheWorst', {
        expiresIn: '10d'
    });
}

router.post('/login', function (req, res, next) {
    var username = req.body.user_name;
    var password = req.body.password;
    User.findOne({'user_name': username}, function (err, user) {
        // if there are any errors, return the error
        if (err)
            res.send(err);
        // If user account found then check the password
        if (user) {
            // Compare passwords
            if (user.validPassword(password)) {
                // Success : Assign new access token for the session
                user.access_token = createJwt({user_name: username});
                user.save();
                res.cookie('Authorization', 'Bearer ' + user.access_token);
                res.json({'success': 'loggedIn'});
            } else {
                res.status(401).send({
                    "status": "error",
                    "body": "Email or password does not match"
                });
            }
        } else {
            res.status(401).send({
                "status": "error",
                "body": "Username not found"
            });
        }
    });
});

module.exports = router;
