var express = require('express');
var router = express.Router();

var Musician = require('../models/musician');

router.post('/', function (req, res) {
  console.log('post: ', req.body);
  var addedMusician = new Musician(req.body);

  addedMusician.save(function (err, data) {
    console.log('save data:', data);
    if (err) {
      console.log('ERR: ', err);
      res.sendStatus(500);
    } else {
      res.send(data);

    }
  });
});

router.get('/', function (req, res) {

  Musician.find({}, function (err, people) {
    if (err) {
      console.log('Get ERR: ', err);
      res.sendStatus(500);
    } else {
      res.send(people);
    }
  });
});

module.exports = router;
