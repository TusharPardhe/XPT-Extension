const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "production",
    devServer: {
        contentBase: path.resolve(__dirname, "..", "./dist"),
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css|s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ]
    },
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
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash].min.css",
            chunkFilename: "[id].[chunkhash].min..css",
        }),
    ]
};
