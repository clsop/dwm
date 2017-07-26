const path = require('path');
const webpack = require('webpack');
//const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = {
    entry: {
        app: './src/client/entry.tsx',
        style: './src/client/style/index.scss'
    },
    output: {
        path: path.join(__dirname, 'assets'),
        publicPath: "/",
        library: "dwm",
        filename: "[name].js"
    },
    resolve: {
        modules: ["bower_components", "node_modules"],
        extensions: [".js", ".json", ".ts", ".tsx"]
    },
    resolveLoader: {
        modules: ["bower_components", "node_modules"],
        descriptionFiles: ["bower.json", "package.json"],
        extensions: [".js", ".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'awesome-typescript-loader'
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: function(module) {
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        }),
        //new TsConfigPathsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};