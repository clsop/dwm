const webpack = require('webpack');
const shared = require('./webpack.shared.config');

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
            includePaths: ['bower_components/skeleton-sass/skeleton', 'bower_components/normalize-scss/sass/normalize']
        }
    }]
});

// hot module replacement plugin
shared.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = shared;