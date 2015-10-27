var webpack      = require('webpack');
var Config       = require('webpack-config');
var AssetsPlugin = require('assets-webpack-plugin');
var CleanPlugin  = require('clean-webpack-plugin');
var StatsPlugin  = require('stats-webpack-plugin');
var ExtractText  = require('extract-text-webpack-plugin');
var merge        = require('merge');
var path         = require('path');
var fs           = require('fs');
var loaders      = require('./src/loaders');

module.exports = function (options) {

    // Require dotenv variables
    var dotenv = process.cwd() + '/.env';
    try {
        if(fs.statSync(dotenv).isFile()) {
            require('dotenv').load({path: dotenv});
        }
    } catch (errors) {
        // ...
    }

    // Define some reusable options
    var env         = process.env.APP_ENV || process.env.NODE_ENV;
    var development = env !== 'production';
    var options     = merge({

        // Environment
        development: development,
        env:         env,
        hot:         process.argv.indexOf('--inline') !== -1,
        domain:      process.env.APP_URL,

        // Filenames and paths
        filenames:  development ? '[name]' : '[name].[hash]',
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

    var config = new Config().merge({
        debug:   true,
        devtool: 'eval',
        cache:   true,

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

        plugins: [
            new ExtractText(options.filenames + '.css', {allChunks: true}),
            new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en-gb)$/),
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
                    test:    /\.js$/,
                    loader:  'baggage?[file].html=template&[file].scss',
                    include: path.join(process.cwd(), options.sourcePath),
                }
            ],
            loaders:    loaders(options),
        }
    });

    //////////////////////////////////////////////////////////////////////
    /////////////////////////////// LOCAL ////////////////////////////////
    //////////////////////////////////////////////////////////////////////

    if (options.development) {
        config = config.merge({
            plugins: [
                new StatsPlugin('stats.json', {
                    chunkModules: true,
                })
            ]
        });
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////// HMR /////////////////////////////////
    //////////////////////////////////////////////////////////////////////

    if (options.hot) {
        config = config.merge({
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
            output:  {
                pathinfo: false,
            },
            plugins: [
                new CleanPlugin(options.outputPath, process.cwd()),
                new webpack.optimize.CommonsChunkPlugin({
                    name:     'main',
                    children: true,
                }),
                new webpack.optimize.DedupePlugin(),
                new webpack.optimize.OccurenceOrderPlugin(true),
                //new webpack.optimize.MinChunkSizePlugin({
                //    minChunkSize: options.inlineLimit,
                //}),
                new webpack.optimize.UglifyJsPlugin({
                    mangle:   true,
                    compress: {
                        warnings: false,
                    },
                }),
            ],
        });
    }

    return config;
};
