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
                loaders.js,
                loaders.html,
                loaders.fontgen,
                loaders.json,
                loaders.fonts,
                loaders.webfonts,
                loaders.images,
            ],
        },
        postcss: function () {
            return [autoprefixer];
        },
    });

    if (options.ts) {
        config.merge({
            module: {
                loaders: [loaders.ts],
            },
        });
    }

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
        config.plugins.push(plugins.stats);
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////// HMR /////////////////////////////////
    //////////////////////////////////////////////////////////////////////

    if (options.hot && options.devServer) {
        config = config.merge({
            output: {
                publicPath: options.devServer + '/' + options.outputPath,
            },
            devServer: {
                contentBase: options.domain,
                historyApiFallback: true,
                hot: true,
            },
            plugins: [
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoErrorsPlugin()
            ],
        });

        config.entry[options.name].unshift(
            'webpack-dev-server/client?' + options.devServer,
            'webpack/hot/only-dev-server',
        );
    } else if (options.hot && !options.devServer) {
        config.entry[options.name].push('webpack-hot-middleware/client?reload=true');

        config = config.merge({
            plugins: [
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoErrorsPlugin()
            ],
        });
    }

    //////////////////////////////////////////////////////////////////////
    ///////////////////////////// PRODUCTION /////////////////////////////
    //////////////////////////////////////////////////////////////////////

    if (!options.development) {
        config = config.merge({
            plugins: [
                new webpack.optimize.AggressiveMergingPlugin(),
                new webpack.optimize.CommonsChunkPlugin({
                    name: options.name,
                    children: true,
                }),
                // https://github.com/webpack/extract-text-webpack-plugin/issues/115
                new webpack.optimize.MinChunkSizePlugin({
                    minChunkSize: options.inlineLimit,
                }),
            ],
        });
    }

    return config;
};
