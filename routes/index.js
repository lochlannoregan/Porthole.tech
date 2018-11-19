var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

function randomArray(){

  var arrayNum = Math.floor((Math.random() * 5) + 1);

  return arrayNum;
}
