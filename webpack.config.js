const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: ['./client/index.js'],
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
    },
    plugins: [new MiniCssExtractPlugin(), new HtmlWebpackPlugin({template: './dev.html'}), new Dotenv({ systemvars: true })],
    module: {
        rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel-loader',
              options: { presets: ['@babel/env'] },
            },
            {
              test: /\.s[ac]ss$/i,
              use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use:[{
                        loader: 'file-loader',
                }]
            },
        ],
    },
    devServer: {
      compress: true,
      port: 8080,
      hot: true,
      proxy: {
        '/api': 'http://localhost:3000',
        secure: true,
      },
      static: {
        directory: path.join(__dirname, '/'),
        publicPath: '/',
      },
    }
}