const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Autoprefixer = require("autoprefixer");

const PATHS = require("./paths");

// set environment to production
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.join(PATHS.public, "/index.html"),
    filename: "index.html",
    inject: "body"
});

const ExtractTextPluginConfig = new ExtractTextPlugin({
    filename: "style.[hash].css",
    disable: false
});

const CommonsChunkPluginConfig = new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    midChunks: Infinity,
    filename: "[name].[hash].js"
});

const WebpackUglifyPluginConfig = new webpack.optimize.UglifyJsPlugin({
    compress: {
        screw_ie8: true,
        warnings: false,
        unused: true,
        dead_code: true
    },
    output: {
        comments: false
    },
    sourceMap: false
});

const WebpackLoaderPluginConfig = new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    options: {
        context: PATHS.src,
        postcss: [Autoprefixer({ browsers: ["last 3 versions"] })]
    }
});

module.exports = {
    devtool: false,
    entry: {
        app: ["babel-polyfill", PATHS.js],
        vendor: [
            "react",
            "react-dom",
            "redux",
            "react-redux",
            "react-router-dom"
        ]
    },
    output: {
        path: PATHS.dist,
        filename: "[name].[hash].js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(css)$/,
                use: ExtractTextPlugin.extract({
                    use: {
                        loader: "css-loader",
                        options: {
                            modules: false,
                            localIdentName:
                                "[path][name]__[local]--[hash:base64:5]"
                        }
                    }
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        //  css-loader
                        {
                            loader: require.resolve("css-loader"),
                            options: {
                                importLoaders: 1,
                                // url: false,
                                minimize: true,
                                sourceMap: false
                            }
                        },
                        //  postcss-loader
                        {
                            loader: require.resolve("postcss-loader"),
                            options: {
                                ident: "postcss",
                                plugins: () => [
                                    require("postcss-flexbugs-fixes"),
                                    Autoprefixer({
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
                                sourceMap: false
                            }
                        }
                    ]
                })
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
                                plugins: [
                                    { removeTitle: true },
                                    { convertPathData: false }
                                ]
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
    plugins: [
        HtmlWebpackPluginConfig,
        ExtractTextPluginConfig,
        WebpackLoaderPluginConfig,
        WebpackUglifyPluginConfig,
        CommonsChunkPluginConfig
    ]
};
