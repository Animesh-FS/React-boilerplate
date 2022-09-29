const path = require("path");
const common = require("./webpack.config");
const { merge } = require("webpack-merge");
const Dotenv = require("dotenv-webpack");
module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "index_bundle.js",
  },
  // webpack 5 comes with devServer which loads in development mode
  devServer: {
    port: 3003,
    historyApiFallback: true,
    open: true,
  },
  plugins: [
    new Dotenv({
      path: "./.env/.env.local",
    }),
  ],
});
