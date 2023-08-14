const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[chunkhash:8].js'
    },
    resolve: {
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, "../src"),
            'components': path.resolve(__dirname, "../src/components")
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, '../public/index.html'),
            inject: "body",
            hash: true,
            cache: false
        }),
        new CssExtractPlugin({
            filename: "style.css",
            chunkFilename: "[name].css"
        })
    ],
}
