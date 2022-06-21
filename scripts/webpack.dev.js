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
    // target: "web", // to enable live reloading
    devServer: {
        contentBase: path.resolve(__dirname, "..", "./dist"),
        liveReload: true,
    },
    devtool: "eval-source-map",
};
