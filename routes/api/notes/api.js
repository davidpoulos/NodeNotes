var express = require('express');
var router = express.Router();
var Note = require('../../../models/notes');

//Get all notes.
router.route('/')
  .get(function(req, res, next) {
     Note.findAsync({}, null, {sort: {"_id":1}})
      .then(function(notes) {
        res.json(notes);
      })
      .catch(next)
      .error(console.error)
  });

//Add a note.
router.route('/')
    .post(function(req, res, next) {
        var note = new Note();
        note.text = req.body.text;
        note.description = req.body.description;
        note.saveAsync()
          .then(function(note) {
            res.json({'status': 'success', 'note': note});

          })
          .catch(function(e) {
            console.log("fail");
            res.json({'status': 'error', 'error': e});
          })
          .error(console.error);
  });

  //Delete a note.
  router.route('/:id')
    .delete(function(req, res, next) {
      Note.findByIdAndRemoveAsync(req.params.id)
      .then(function(deletedNote) {
        res.json({'status': 'success', 'note': deletedNote});
      })
      .catch(function(e) {
        res.status(400).json({'status': 'fail', 'error': e});
      });
    });

module.exports = router;
