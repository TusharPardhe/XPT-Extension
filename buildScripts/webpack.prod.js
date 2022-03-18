const path = require("path");
const Dotenv = require("dotenv-webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "production",
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname, "..", "./.env.production"),
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "..", "./dist"),
    },
    devtool: "source-map",
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
    },
};
