var browserSync = require('browser-sync').create();
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var historyFallback = require('connect-history-api-fallback');

var webpackConfig = require('./webpack.dev.config');
var bundler = webpack(webpackConfig);

bundler.plugin('done', function (stats) {
    if (stats.hasErrors() || stats.hasWarnings()) {
        return browserSync.sockets.emit('fullscreen:message', {
            title: "Webpack Error:",
            body: stats.toString(),
            timeout: 100000
        });
    }
    browserSync.reload();
});

browserSync.init({
    server: {
        baseDir: './src/client',
        index: 'index.html'
    },
    logFileChanges: false,
    middleware: [
        webpackDevMiddleware(bundler, {
            publicPath: webpackConfig.output.publicPath,
            stats: {colors: true}
        }),
        webpackHotMiddleware(bundler),
        historyFallback()
    ],
    cors: true,
    plugins: ['bs-fullscreen-message'],
    files: [
        'src/client/index.html',
        'src/client/style/*.scss',
        'src/client/*.tjs'
    ]
});