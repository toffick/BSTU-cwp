const webpack = require('webpack');

module.exports = [{
    entry: './src/index.js',
    output: {
        filename: './public/index.js'
    },
    watch: true
},
    {
        entry: './src/form.js',
        output: {
            filename: './public/form.js'
        },
        watch: true
    }];