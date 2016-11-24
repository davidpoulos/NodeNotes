var $ = require('jquery');
var noteTemplate = require("../views/partials/note.hbs");

var add_note = function() {
    var note = $('#add_note').val();
    var desc = $('#add_description').val();
    var col = $('#sel1').val();

    console.log(col);

    $.ajax({
        type: "POST",
        url: '/api/notes',
        data: {
            text: note,
            description: desc,
            color: col
        },
        dataType: 'json',
        success: function(data) {
            //console.log(data.note);
            var noteTemp = noteTemplate(data.note);
            $('#unordered').append(noteTemp);

        }
    });

    $('#add_note').val("");
    $('#add_description').val("");

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

    $('#unordered').on('click', 'div div button', function() {
        var $this = $(this),
            $li = $this.parent().parent(),
            id = $li.attr('id');
            console.log("ID" + id);
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
