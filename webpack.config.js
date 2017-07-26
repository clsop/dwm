const webpack = require("webpack");
const shared = require("./webpack.shared.config");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].[chunkhash].css"
});
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackChunkHash = require("webpack-chunk-hash");

shared.output.filename = '[name].[chunkhash].min.js';
shared.output.chunkFilename = "[name].[chunkhash].js"

/**
 * extract style into stylesheet for release builds
 */
shared.module.rules.push({
    test: /\.scss$/,
    use: extractSass.extract({
        use: [{
            loader: 'css-loader'
        }, {
            loader: 'fast-sass-loader',
            options: {
                includePaths: ['bower_components/skeleton-sass/skeleton', 'bower_components/normalize-scss/sass/normalize']
            }
        }],
        fallback: 'style-loader'
    })
});

/**
 * Uglifying
 */
shared.plugins.push(new WebpackChunkHash(),
    new ChunkManifestPlugin({
        filename: 'manifest.json',
        manifestVariable: 'webpackManifest',
        inlineManifest: false
    }),
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify('production')
        }
    }), new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        mangle: true
    }),
    extractSass);

/**
 * use react-lite in release build for minimal script size
 */
shared.resolve.alias = {
    'react': 'react-lite',
    'react-dom': 'react-lite'
};

module.exports = shared;