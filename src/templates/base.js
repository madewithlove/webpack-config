import webpack from 'webpack';
import Config from 'webpack-config';
import CleanPlugin from 'clean-webpack-plugin';
import objectPath from 'object-path';

export default function (options, loaders, plugins) {
    let config = new Config().merge({
        debug: true,
        devtool: 'eval',
        cache: true,

        entry: ['./' + options.sourcePath],
        output: {
            pathinfo: options.development,
            path: options.outputPath,
            filename: options.filenames + '.js',
        },
        resolve: {
            extensions: ['', '.ts', '.js'],
        },
        plugins: objectPath.get(options, 'plugins', []),
        module: {
            loaders: objectPath.get(options, 'module.loaders', []),
        },
    });

    if (!options.development) {
        config = config.merge({
            debug: false,
            devtool: false,
            output: {
                pathinfo: false,
            },
            plugins: [
                new CleanPlugin(options.outputPath, process.cwd()),
                new webpack.optimize.DedupePlugin(),
                plugins.uglify,
            ],
        });
    }

    return config;
};
