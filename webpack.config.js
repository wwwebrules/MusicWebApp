// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";
const pages = ["index", "pagee"];
const config = {
    entry: "./src/index.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[hash].js",
      clean: true
    },
    devServer: {
      open: true,
      host: "localhost"
    },
    plugins: [].concat(
      pages.map(
        (page) =>
          new HtmlWebpackPlugin({
            inject: true,
            template: `./src/${page}.html`,
            filename: `${page}.html`
          })
      )),
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: "html-loader"
        },
        {
          test: /\.(ts|tsx)$/i,
          loader: "ts-loader",
          exclude: ["/node_modules/"]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"]
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|mp3)$/i,
          type: "asset"
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"]
    },
    stats: {
      children: true
    }
  }
;

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    config.plugins.push(new MiniCssExtractPlugin({
      filename: "[name].[hash].css"
    }));
  } else {
    config.mode = "development";
    config.devtool = "source-map";
  }
  return config;
};
