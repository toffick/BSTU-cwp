exports.isValidComment = function (data) {
    return (data.text !== undefined &&
        data.author !== undefined);
};

exports.isValidArticle = function (data) {
    return (data.title !== undefined &&
        data.text !== undefined &&
        data.author !== undefined);
};

exports.isValidId = function (data) {
    return data.id !== undefined || data.articleId !== undefined;
};

