const path = require("path");

module.exports = {
    mode: "development",
    plugins: [],
    devServer: {
        contentBase: path.resolve(__dirname, "..", "./dist"),
        hot: true,
    },
    devtool: "eval-source-map",
};
