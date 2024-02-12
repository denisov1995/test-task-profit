const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',

    entry: {
        main: './src/index.js',
    },

    devServer: {
        historyApiFallback: true, 
    },

    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/',
        path: __dirname + '/build',
    },


    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/components/home/home.html'),
            filename: 'home.html',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/components/about/about.html'),
            filename: 'about.html',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/components/login/login.html'),
            filename: 'login.html',
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(scss|css)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(?:|gif|png|jpg|svg)$/,
                type: "asset/resource",
            },
        ],
    },
};
