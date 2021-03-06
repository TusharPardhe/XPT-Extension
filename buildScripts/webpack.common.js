const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
                test: /\.css|s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(jpg|png|gif|jpeg|woff|woff2|eot|ttf|svg)$/,
                use: ["url-loader?limit=100000"],
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "..", "./src/index.html"),
            favicon: "./favicon.ico",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash].min.css",
            chunkFilename: "[id].[chunkhash].min..css",
        }),
        new NodePolyfillPlugin(),
        new CopyWebpackPlugin({
            patterns: [{ from: path.resolve(__dirname, "..", "manifest.json") }, { from: path.resolve(__dirname, "..", "logo192.png") }],
        }),
    ],
    output: {
        path: path.resolve(__dirname, "..", "dist"),
        filename: "bundle.js",
        publicPath: "/",
    },
    devServer: {
        historyApiFallback: true,
    },
};
