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
        baseDir: './dist',
        index: 'index.html'
    },
    serveStatic: ['./node_modules/semantic-ui-sass/icons', './node_modules/semantic-ui-sass/images'],
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
        'src/client/index.hbs',
        'src/client/style/*.scss',
        'src/client/**/*.tsx'
    ]
});