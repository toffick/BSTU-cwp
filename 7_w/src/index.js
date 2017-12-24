const $ = require('jquery');
const _ = require('underscore');
const articleTemplate = require('../public/templates/article-template');
const paginationTemplate = require('../public/templates/pagination-template');
const commentTemplae = require('../public/templates/comment-template');
const  getInputValuesArrayFromForm  = require('../lib/arrayToObj').arrayToObj;

function getArticlesWithParams(params) {
    return $.post('http://127.0.0.1:3000/api/articles/readall', JSON.stringify(params));
}

function createCommentsWithParams(params) {
    return $.post('http://127.0.0.1:3000/api/comments/create', JSON.stringify(params));
}

function deleteArticle(params) {
    return $.post('http://127.0.0.1:3000/api/articles/delete', JSON.stringify(params));
}


function renderArticles(data) {
    let articles = _.template(articleTemplate)({articles: data.titles});
    let pagination = _.template(paginationTemplate)({number: data.meta.pagination.pages});

    $('.articles__container').html(articles);
    $(".pagination").html(pagination);
}

$(function () {
    let pageNumber = 1;

    getArticlesWithParams({limit: 5, page: pageNumber})
        .then(renderArticles);

    $('#order').change(function () {
        let order = $("#order").val();
        getArticlesWithParams({sortOrder: order, limit: 5, page: pageNumber})
            .then(renderArticles);
    });

    $('.pagination').on('click', 'button', async function () {
        pageNumber = $(this).val();
        let order = $("#order").val();

        const response = await getArticlesWithParams({sortOrder: order, limit: 5, page: pageNumber});
        renderArticles(response);

    });

    $('.articles__container').on('click', '.button_add_comment', async function (event) {
        event.preventDefault();

        let commentObj = getInputValuesArrayFromForm(this,'form');
        const data = await createCommentsWithParams(commentObj);
        let commentHtml = _.template(commentTemplae)({commentItem: data});
        $(this).parents(".comment__form").prev().after(commentHtml);
        $('input').val('');
    });

    $('.articles__container').on('click', '.delete_article', async function (event) {
        let articleID = $(event.target).parents('.article__item').find('.articleId').html();
        deleteArticle({id: articleID})
    });
});


