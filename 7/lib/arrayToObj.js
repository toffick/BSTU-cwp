const $ = require('jquery');

exports.arrayToObj = function (context, selector) {
    let formdata = $(context).parents(selector).serializeArray();
    let commentObj = {};
    $(formdata).each(function (index, obj) {
        commentObj[obj.name] = obj.value;
    });
    return commentObj;
};