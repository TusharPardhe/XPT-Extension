const path = require("path");

module.exports = {
    mode: "development",
    plugins: [],
    module: {
        rules: [
            {
                test: /\.css|s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    devServer: {
        contentBase: path.resolve(__dirname, "..", "./dist"),
        hot: true,
    },
    devtool: "eval-source-map",
};
