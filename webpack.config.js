// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //
        loader: 'url-loader',
        exclude: [resolve('src/icons')],
        options: {
          limit: 10000,

        }
      },
      {
        test: /.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            lessOptions: {
              strictMath: true,
              noIeCompat: true,
            },
          },
        ],
      },
    ],
  },
};
