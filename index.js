var webpack      = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var CleanPlugin  = require('clean-webpack-plugin');
var Config       = require('webpack-config');
var ExtractText  = require('extract-text-webpack-plugin');
var merge        = require('merge');
var path         = require('path');
var loaders      = require('./src/loaders');

module.exports = function (options) {

    // Require dotenv variables
    require('dotenv').load({
        path: process.cwd() + '/.env',
    });

    var development = process.env.APP_DEBUG === 'true';
    var options     = merge({

        // Environment
        development: development,
        env:         process.env.APP_ENV,
        hot:         process.argv.indexOf('--inline') !== -1,

        // Filenames and paths
        filenames:  development ? '[name]' : '[name]-[hash]',
        devServer:  'http://localhost:8080',
        sourcePath: 'resources/assets/js',
        outputPath: 'public/builds/',

        // Other options
        react:       true,
        inlineLimit: 50000,
        cssLoaders:  development ? 'css' : 'css!autoprefixer',

    }, options);

    //////////////////////////////////////////////////////////////////////
    ////////////////////////////// DEFAULTS //////////////////////////////
    //////////////////////////////////////////////////////////////////////

    var config = Config.fromObject({
        debug:   true,
        devtool: 'eval',

        entry:  [
            './' + options.sourcePath,
        ],
        output: {
            pathinfo:      options.development,
            path:          options.outputPath,
            publicPath:    '/' + options.outputPath.replace('public/', ''),
            filename:      options.filenames + '.js',
            chunkFilename: options.filenames.replace('hash', 'chunkhash') + '.js',
        },

        resolveLoaders: {
            root: [
                path.join(process.cwd(), 'node_modules'),
                path.join(__dirname, 'node_modules'),
            ],
        },

        plugins: [
            new ExtractText(options.filenames + '.css', {allChunks: true}),
            new CleanPlugin(options.outputPath),
            new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en-gb)$/),
            new webpack.optimize.CommonsChunkPlugin({
                name:     'main',
                children: true,
            }),
            new AssetsPlugin({
                path:        options.outputPath,
                filename:    'manifest.json',
                prettyPrint: true,
            }),
            new webpack.ProvidePlugin({
                $:      'jquery',
                _:      'lodash',
                jQuery: 'jquery',
            }),
            new webpack.DefinePlugin({
                __SERVER__:      options.development,
                __DEVELOPMENT__: options.development,
                __DEVTOOLS__:    options.development,
                'process.env':   {
                    BABEL_ENV: JSON.stringify(process.env.APP_ENV),
                    NODE_ENV:  JSON.stringify(process.env.APP_ENV),
                },
            }),
        ],
        module:  {
            preLoaders: [
                {
                    test:   /\.js$/,
                    loader: 'baggage?[file].html=template&[file].scss'
                }
            ],
            loaders:    loaders(options),
        }
    });

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////// HMR /////////////////////////////////
    //////////////////////////////////////////////////////////////////////

    if (options.hot) {
        config = config.extend({
            output:    {
                publicPath: options.devServer + '/' + options.outputPath,
            },
            devServer: {
                contentBase: options.domain,
                hot:         true,
            },
            plugins:   [
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoErrorsPlugin()
            ],
        });

        config.entry = [
            'webpack-dev-server/client?' + options.devServer,
            'webpack/hot/only-dev-server',
        ].concat(config.entry);
    }

    //////////////////////////////////////////////////////////////////////
    ///////////////////////////// PRODUCTION /////////////////////////////
    //////////////////////////////////////////////////////////////////////

    if (!options.development) {
        config = config.merge({
            debug:   false,
            devtool: false,
            plugins: [
                new webpack.optimize.DedupePlugin(),
                new webpack.optimize.OccurenceOrderPlugin(true),
                new webpack.optimize.MinChunkSizePlugin({
                    minChunkSize: options.inlineLimit,
                }),
                new webpack.optimize.UglifyJsPlugin({
                    mangle:   true,
                    compress: {
                        warnings: false,
                    },
                }),
            ],
        });
    }

    console.log(config, config.module.loaders);

    return config;
};
