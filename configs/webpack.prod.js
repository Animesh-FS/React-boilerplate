const path = require("path");
const common = require("./webpack.config");
const merge = require("webpack-merge");
module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.[contentHash].js",
  },
});
