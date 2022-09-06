// webpack.config.js
module.exports = {
    module: {
        rules: [{
            test: /.less$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "less-loader", 
                lessOptions: {
                    strictMath: true,
                    noIeCompat: true
                }
            }]
        }]
    }
};
