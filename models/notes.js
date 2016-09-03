var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);

var NoteSchema = new Schema({
  text: {type: 'String', required: true},
  description: {type: 'String', required: true}
});

var Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
