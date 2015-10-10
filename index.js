var webpack      = require('webpack');
var ExtractText  = require('extract-text-webpack-plugin');
var CleanPlugin  = require('clean-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
var Config       = require('webpack-config');
var merge        = require('lodash/object/merge');
var babelrc      = require('./babelrc');
var path         = require('path');

module.exports = function (options) {

    // Require dotenv variables
    require('dotenv').load({
        path: process.cwd() + '/.env',
    });

    var options = merge({

        // Environment
        development: process.env.APP_DEBUG === 'true',
        env:         process.env.APP_ENV,
        hot:         process.argv.indexOf('--inline') !== -1,

        // Filenames and paths
        filenames:  '[name]',
        devServer:  'http://localhost:8080',
        sourcePath: 'resources/assets/js',
        outputPath: 'public/builds/',

        // Other options
        inlineLimit: 50000,

    }, options);

    //////////////////////////////////////////////////////////////////////
    /////////////////////////////// LOCAL ////////////////////////////////
    //////////////////////////////////////////////////////////////////////

    var config = Config.fromObject({
        debug:   true,
        devtool: 'eval',
        hot:     false,

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
            new CleanPlugin(options.outputPath),
            new ExtractText(options.filenames + '.css', {allChunks: true}),
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
            loaders:    [
                {
                    test:   /\.css$/,
                    loader: ExtractText.extract('style', 'css!autoprefixer'),
                },
                {
                    test:   /\.scss$/,
                    loader: ExtractText.extract('style', 'css!autoprefixer!sass'),
                },
                {
                    test:   /\.woff/,
                    loader: 'url',
                    query:  {
                        limit:    options.inlineLimit,
                        mimetype: 'application/font-woff',
                    },
                },
                {
                    test:   /\.(ttf|eot)$/,
                    loader: 'url',
                },
                {
                    test:    /\.(png|gif|jpe?g|svg)$/,
                    loaders: ['url?limit=' + options.inlineLimit, 'image-webpack?bypassOnDebug'],
                },
                {
                    test:    /\.js$/,
                    loader:  'babel',
                    include: path.join(process.cwd(), options.sourcePath),
                    query:   babelrc,
                },
                {
                    test:   /\.json$/,
                    loader: 'json',
                }
            ],
        }
    });

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////// HMR /////////////////////////////////
    //////////////////////////////////////////////////////////////////////

    if (options.hot) {
        config = config.extend({
            hot:       true,
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
                new webpack.optimize.OccurenceOrderPlugin(),
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

    console.log(options, config);

    return config;
};
