var $ = require('jquery');
var noteTemplate = require("../views/partials/note.hbs");

var add_note = function() {
    var note = $('#add_note').val();
    var desc = $('#add_description').val();

    $.ajax({
        type: "POST",
        url: '/api/notes',
        data: {
            text: note,
            description: desc
        },
        dataType: 'json',
        success: function(data) {
            //console.log(data.note);
            var noteTemp = noteTemplate(data.note);
            $('#unordered').append(noteTemp);
        }
    });

};

var delete_note = function(id, cb) {
    $.ajax({
        url: '/api/notes/' + id,
        type: 'DELETE',
        data: {
            id: id
        },
        dataType: 'json',
        success: function(data) {
            cb();
        }
    });
};

var delete_li = function($li) {
    $li.remove();
};

$(function() {
    $('#submit_note').on('click', add_note);

    $('ul').on('click', 'li button', function() {
        var $this = $(this),
            $li = $this.parent(),
            id = $li.attr('id');
        delete_note(id, function() {
            delete_li($li);
        });
    });

    $(":text").on('keypress', function(e) {
        var key = e.keyCode;
        if (key == 13 || key == 169) {
            add_note();
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });




});
