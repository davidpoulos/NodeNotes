var express = require('express');
var router = express.Router();

var Note = require('../models/notes');

router.get('/', function(req, res, next){
  Note.findAsync()
    .then(function(notes){
      res.render('notes', { title: 'Node Notes', notes: notes});
    })
    .catch(next)
    .error(console.error)
  //res.render('notes', { title: 'Welcome to Node Notes'});
});

module.exports = router;
