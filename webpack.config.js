// Generated using webpack-cli https://github.com/webpack/webpack-cli
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = MiniCssExtractPlugin.loader;
const environment = {
  paths: {
    /* Path to source files directory */
    source: path.resolve(__dirname, "./src/"),
    /* Path to built files directory */
    output: path.resolve(__dirname, "./dist/")
  }

};
const templateFiles = fs.readdirSync(environment.paths.source)
  .filter((file) => [".html", ".ejs"].includes(path.extname(file).toLowerCase())).map((filename) => ({
    input: filename,
    output: filename.replace(/\.ejs$/, ".html")
  }));

const htmlPluginEntries = templateFiles.map((template) => new HtmlWebpackPlugin({
  inject: true,
  hash: false,
  filename: template.output,
  template: path.resolve(environment.paths.source, template.input)
}));
const config = {
  entry: "./src/js/index.ts",

  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "js/[name].[hash].js",
    path: path.resolve(__dirname, "dist")
    ,
    clean: true
  },
  devServer: {
    open: true,
    host: "localhost",
    hot: true
  },
  stats: {
    children: true
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //     template: JSON.stringify(["src/index.html", "src/page.html"]),
    // }),

    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css"
    })

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ].concat(htmlPluginEntries),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.html$/i,
        loader: "html-loader"
      },
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"]

      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"]

      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[hash][ext]"
        }
      },
      {
        test: /\.(svg|png|jpg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[name].[hash][ext]"
        }
      },
      {
        test: /\.mp3$/i,
        type: "asset/resource",
        generator: {
          filename: "audio/[name].[hash][ext]"
        }
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ]
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
          options: {
            // Your options for `squoosh`
          }
        }
      })
    ]
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
