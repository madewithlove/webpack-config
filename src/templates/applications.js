import ExtractText from 'mini-css-extract-plugin';
import webpack from 'webpack';

export default function(config, options, loaders, plugins) {
    //////////////////////////////////////////////////////////////////////
    ////////////////////////////// DEFAULTS //////////////////////////////
    //////////////////////////////////////////////////////////////////////

    config = config.merge({
        output: {
            publicPath: `/${options.outputPath.replace('public/', '')}`,
            chunkFilename: `${options.filenames.replace(
                'hash',
                'chunkhash',
            )}.js`,
        },
        plugins: [
            new ExtractText({
                filename: `${options.filenames}.css`,
                allChunks: true,
            }),
            new webpack.ContextReplacementPlugin(
                /moment[\\/]locale$/,
                /^\.\/(en-gb)$/,
            ),
            plugins.assets,
            plugins.occurenceOrder,
        ],
        module: {
            rules: [
                loaders.css,
                loaders.scss,
                loaders.js,
                loaders.html,
                loaders.fontgen,
                loaders.fonts,
                loaders.webfonts,
                loaders.images,
                loaders.vue,
            ],
        },
    });

    if (options.ts) {
        config.merge({
            module: {
                rules: [loaders.ts],
            },
        });
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////// HMR /////////////////////////////////
    //////////////////////////////////////////////////////////////////////

    if (options.hot && options.devServer) {
        config = config.merge({
            output: {
                publicPath: `${options.devServer}/${options.outputPath}`,
            },
            devServer: {
                historyApiFallback: true,
                hot: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                proxy: {
                    '*': options.domain,
                },
            },
            plugins: [
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoEmitOnErrorsPlugin(),
            ],
        });

        config.entry[options.name].unshift(
            `webpack-dev-server/client?${options.devServer}`,
            'webpack/hot/only-dev-server',
        );
    } else if (options.hot && !options.devServer) {
        config.entry[options.name].push(
            'webpack-hot-middleware/client?reload=true',
        );

        config = config.merge({
            plugins: [
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoEmitOnErrorsPlugin(),
            ],
        });
    }

    //////////////////////////////////////////////////////////////////////
    ///////////////////////////// PRODUCTION /////////////////////////////
    //////////////////////////////////////////////////////////////////////

    return config;
}
