const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackAssetsManifest = require('webpack-assets-manifest');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});

module.exports = {
  entry: "./src",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: '[name].[contenthash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],

      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        // use: [
        //   {
        //     loader: MiniCssExtractPlugin.loader,
        //   },
        //   {
        //     loader:  "css-loader",
        //     options: {
        //       modules: {
        //         namedExport: true,
        //         //localIdentName: "foo__[name]__[local]",
        //       },
        //     },
        //   },
        // ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  plugins: [
    htmlPlugin,
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new WebpackAssetsManifest({
      // eslint-disable-next-line
      transform(assets, manifest) {
        const {
          name
        } = require('./package.json');

        assets.name = name;
      }
    }),
  ],
};
