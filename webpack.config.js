const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: {
      background: "./src/background.js",
      content: "./src/content.js",
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: "./src/manifest.json",
            to: "manifest.json",
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    devtool: isProduction ? false : "source-map",
    watch: !isProduction,
  };
};
