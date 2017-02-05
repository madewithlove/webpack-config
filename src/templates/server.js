import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

export default function (config, options, loaders, plugins) {
    config = config.merge({
        target: 'node',
        resolve: {
            alias: {
                'isomorphic-fetch': 'isomorphic-fetch/fetch-npm-node',
            },
        },
        externals: [
            {
                'webpack': 'commonjs webpack',
                'webpack-hot-middleware': 'commonjs webpack-hot-middleware',
                'webpack-dev-middleware': 'commonjs webpack-dev-middleware',
            },
            nodeExternals({
                whitelist: ['webpack/hot/poll?1000'],
            }),
        ],
        module: {
            loaders: [
                loaders.js,
                loaders.html,
                loaders.fontgen,
                loaders.json,
                loaders.fonts,
                loaders.webfonts,
                loaders.images,
                {
                    test: /\.(css|scss)/,
                    loader: 'null-loader',
                },
            ],
        },
        plugins: [
            plugins.occurenceOrder,
            new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
        ],
    });

    if (options.hot) {
        config.entry[options.name].unshift('webpack/hot/poll?1000');

        config.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
        );
    }

    return config;
}
