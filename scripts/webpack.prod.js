const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(base, {
    mode: 'production',
    plugins: [new CssMinimizerWebpackPlugin()]
});
