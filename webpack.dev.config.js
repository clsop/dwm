const webpack = require('webpack');
const shared = require('./webpack.shared.config');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');

// webpack hot module entry for client updates
Object.defineProperty(shared.entry, 'hot', {
    value: 'webpack-hot-middleware/client'
});

/**
 * enable source maps
 */
shared.devtool = '#eval-source-map';

/**
 * sass loader in dev server as js module
 */
shared.module.rules.push({
    test: /\.scss$/,
    use: [{
        loader: 'style-loader'
    }, {
        loader: 'css-loader'
    }, {
        loader: 'fast-sass-loader',
        options: {
            includePaths: ['node_modules/semantic-ui-sass', 'node_modules/semantic-ui-sass/icons', 'node_modules/semantic-ui-sass/images']
        }
    }]
});

// hot module replacement plugin
shared.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        title: 'Drive With Me',
        filename: 'index.html',
        template: 'src/client/index.hbs',
        minify: {
            html5: true
        }
    }), new InlineChunkManifestHtmlWebpackPlugin({
        dropAsset: true,
        extractManifest: false
    })
);

module.exports = shared;