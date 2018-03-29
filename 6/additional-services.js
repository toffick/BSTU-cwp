const fs = require('fs');

exports.saveArticles = function(data){
    fs.writeFile("./content/articles.json", JSON.stringify(data,null,'\t'),function(err){
        if(err) console.error(err);
    });
};
