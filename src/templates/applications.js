import webpack from 'webpack';
import ExtractText from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';

export default function (config, options, loaders, plugins) {

    //////////////////////////////////////////////////////////////////////
    ////////////////////////////// DEFAULTS //////////////////////////////
    //////////////////////////////////////////////////////////////////////

    config = config.merge({
        output: {
            publicPath: '/' + options.outputPath.replace('public/', ''),
            chunkFilename: options.filenames.replace('hash', 'chunkhash') + '.js',
        },
        plugins: [
            new ExtractText(options.filenames + '.css', {allChunks: true}),
            new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en-gb)$/),
            plugins.assets,
            plugins.provide,
            plugins.occurenceOrder,
        ],
        module: {
            preLoaders: [
                loaders.baggage,
            ],
            loaders: [
                loaders.css,
                loaders.scss,
                loaders.ts,
                loaders.js,
                loaders.html,
                loaders.json,
                loaders.webfonts,
                loaders.fonts,
                loaders.images,
            ],
        },
        postcss: function () {
            return [autoprefixer];
        },
    });

    //////////////////////////////////////////////////////////////////////
    ////////////////////////////// LINTING ///////////////////////////////
    //////////////////////////////////////////////////////////////////////

    if (options.linting && options.development) {
        config = config.merge({
            eslint: {
                extends: "eslint-config-madewithlove",
            },
            module: {
                preLoaders: [
                    loaders.eslint,
                ]
            }
        });
    }

    //////////////////////////////////////////////////////////////////////
    /////////////////////////////// LOCAL ////////////////////////////////
    //////////////////////////////////////////////////////////////////////

    if (options.development) {
        config = config.merge({
            plugins: [plugins.stats],
        });
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////// HMR /////////////////////////////////
    //////////////////////////////////////////////////////////////////////

    if (options.hot) {
        config = config.merge({
            output: {
                publicPath: options.devServer + '/' + options.outputPath,
            },
            devServer: {
                contentBase: options.domain,
                hot: true,
            },
            plugins: [
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
            plugins: [
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'main',
                    children: true,
                }),
                new webpack.optimize.MinChunkSizePlugin({
                    minChunkSize: options.inlineLimit,
                }),
            ],
        });
    }

    return config;
};
