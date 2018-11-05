var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/gorumna-island', function(req, res, next) {
    res.render('gorumna-island', { title: 'Express' });
});

module.exports = router;
