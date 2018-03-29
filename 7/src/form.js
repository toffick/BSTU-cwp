const $ = require('jquery');
const _ = require('underscore');

function getArticlesWithParams(params) {
    return $.post('http://127.0.0.1:3000/api/articles/create', JSON.stringify(params));
}


$(function () {
    $("#article_form" ).submit(function( event ) {
        let title = $('#title').val();
        let author = $('#author').val();
         let article = $('#article').val();
        getArticlesWithParams({title: title, author: author, text: article}).then(function(data){
            alert(JSON.stringify(data));
        });
    });
});


