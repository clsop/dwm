const webpack = require("webpack");
const shared = require("./webpack.shared.config");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].[chunkhash].css"
});
const WebpackChunkHash = require("webpack-chunk-hash");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');

shared.output.filename = '[name].[chunkhash].min.js';
shared.output.chunkFilename = "[name].[chunkhash].min.js";

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
                includePaths: ['node_modules/semantic-ui-sass', 'node_modules/semantic-ui-sass/icons', 'node_modules/semantic-ui-sass/images']
            }
        }],
        fallback: 'style-loader'
    })
}, {
    test: /\.hbs$/,
    use: {
        loader: 'handlebars-loader'
    }
});

/**
 * Uglifying
 */
shared.plugins.push(
    new WebpackChunkHash(),
    new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        minChunks: Infinity
    }),
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        mangle: true
    }),
    extractSass,
    new OptimizeCssPlugin({
        assetNameRegExp: /\.css$/,
        cssProcessorOptions: {
            discardComments: {
                removeAll: true
            }
        }
    }),
    new HtmlWebpackPlugin({
        title: 'Drive With Me',
        filename: 'index.html',
        template: 'src/client/index.hbs',
        minify: {
            html5: true,
            minifyJS: true,
            minifyCSS: true,
            removeComments: true,
            removeEmptyAttributes: true
        }
    }),
    new InlineChunkManifestHtmlWebpackPlugin({
        dropAsset: true,
        extractManifest: true
    })
);

/**
 * use react-lite in release build for minimal script size
 */
shared.resolve.alias = {
    'react': 'react-lite',
    'react-dom': 'react-lite'
};

module.exports = shared;