("use strict");

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");

const PATHS = require("./paths");

// set environment to development
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(PATHS.public, "/index.html"),
  filename: "index.html",
  inject: "body"
});

module.exports = {
  devtool: "cheap-module-source-map",
  entry: {
    app: ["babel-polyfill", "react-hot-loader/patch", PATHS.js]
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.scss$/,
        use: [
          //  style-loader
          require.resolve("style-loader"),
          //  css-loader
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1
            }
          },
          //  postcss-loader
          {
            loader: require.resolve("postcss-loader"),
            options: {
              ident: "postcss",
              sourceMap: true,
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                  browsers: [
                    ">1%",
                    "last 4 versions",
                    "Firefox ESR",
                    "not ie < 9" // IE9 & IE9+
                  ],
                  flexbox: "no-2009"
                })
              ]
            }
          },
          //  sass-loader
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "img-loader",
            options: {
              gifsicle: {
                interlaced: false
              },
              mozjpeg: {
                progressive: true,
                arithmetic: false
              },
              optipng: false, // disabled
              pngquant: {
                floyd: 0.5,
                speed: 2
              },
              svgo: {
                plugins: [{ removeTitle: true }, { convertPathData: false }]
              }
            }
          },
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:8].[ext]",
              publicPath: "./",
              outputPath: "images/",
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig, new webpack.NamedModulesPlugin()],
  // use mocks for unused node_modules dependencies
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  // turn off warnings
  performance: {
    hints: false
  },
  devServer: {
    host: "localhost",
    port: 9000,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
};
