const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: path.resolve(__dirname, "..", "./src/index.js"),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: ["babel-loader"],
            },
            {
                test: /\.(jpg|png|gif|jpeg|woff|woff2|eot|ttf|svg)$/,
                use: ["url-loader?limit=100000"],
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
        fallback: {
            "fs": false
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "..", "./src/index.html"),
            favicon: "./favicon.ico",
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new NodePolyfillPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, "..", "manifest.json") },
                { from: path.resolve(__dirname, "..", "xpt192.png") },
                { from: path.resolve(__dirname, "../src/scripts/background.js") },
                { from: path.resolve(__dirname, "../src/scripts/content.js") },
            ],
        }),
        new Dotenv({
            path: path.resolve(__dirname, "../.env")
        }),
    ],
    output: {
        path: path.resolve(__dirname, "..", "dist"),
        filename: "bundle.js",
        publicPath: "/",
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
    },
};
