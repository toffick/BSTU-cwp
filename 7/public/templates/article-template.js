module.exports = "<% _.each(articles,function(val){ %>" +

    "<div class='article__item jumbotron jumbotron-fluid'>" +
    "<button type='button' class='close delete_article'>" +
    "    <span>&times;</span>" +
    "</button>" +
    "<div class='news__text'><h3 class='title' class='display-1'><%= val.title %></h3>" +
    "<div class='date'><%= new Date(val.date).toLocaleDateString()  %></div>" +
    "<div class='text'><%= val.text %></div>" +
    "<div class='author' class='lead'><%= val.author %></div>" +
    "<div class='articleId'><%= val.id %></div></div>" +
    "<div class='comment__container'>" +
    "<% _.each(val.comments,function(comment){%>" +
        "<div class='comment'>"+
            "<div ><%= comment.author%> " +
            "<float class = 'date'><%= new Date(comment.date).toLocaleDateString()  %><float></div>" +
            "<div style='font-style: italic;'><%= comment.text%></div>" +
            "<div class='commentId'><%= comment.id %></div>"+
        "</div>"+
    "<%}); %>"+
        "</div><div class ='comment__form'>" +
        "<form class='form_group'>" +
                 "<input name = 'author'  require placeholder='Автор' class='form-control comment_author'><br>" +
                 "<input name = 'text' require placeholder='Комментарий' class='form-control comment_text'>" +
                 "<input type='hidden' name='articleId' value='<%= val.id %>'>"+
                 "<button class='btn button_add_comment' type='submit' style='margin:5px 0 0 0;'>Добавить</button>" +
        "</form></div>"+
    "</div>" +
    "<%}); %>";


