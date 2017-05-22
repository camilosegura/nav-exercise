const webpack = require('webpack'); //to access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SassLintPlugin = require('sasslint-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "css/[name].css",
    disable: process.env.NODE_ENV === "development"
});

const copy = new CopyWebpackPlugin([
  {
    context: './src',
    from: 'styles/fonts',
    to: 'fonts'
  },
  {
    context: './src',
    from: 'assets/images',
    to: 'img'
  }
]);
const config = {
  entry: './src/scripts/main.js',
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'bundle.js'
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
            use: [
                {
                  loader: "css-loader",
                  options: {
                    sourceMap: true
                  }
                },
                {
                  loader: "sass-loader",
                  options: {
                    sourceMap: true
                  }
                }
              ],
            // use style-loader in development
            fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      filename: '../public/index.html',
      template: './src/markup/pages/index.hbs'
    }),
    new SassLintPlugin({
      ignorePlugins: ['extract-text-webpack-plugin'],
      context: './src',
      failOnError: false
    }),
    new LiveReloadPlugin(),
    new CleanWebpackPlugin(['public'], {
      root: path.resolve(__dirname, '../')
    }),
    extractSass,
    copy
  ]
};

module.exports = config;
