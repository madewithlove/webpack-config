import path from 'path';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import objectPath from 'object-path';
import HardSourcePlugin from 'hard-source-webpack-plugin';
import webpack from 'webpack';
import Config from 'webpack-config';

export default function(options, loaders, plugins) {
    let config = new Config().merge({
        devtool: 'eval',
        cache: true,

        entry: {
            [options.name]: [`./${options.entry}`],
        },
        output: {
            pathinfo: options.development,
            path: path.resolve(options.outputPath),
            filename: `${options.filenames}.js`,
        },
        plugins: objectPath.get(options, 'plugins', []),
        resolve: {
            alias: {
                vue$: 'vue/dist/vue.common.js',
            },
        },
        module: {
            rules: objectPath.get(options, 'module.rules', []),
        },
    });

    config.plugins.push(plugins.define, new CaseSensitivePathsPlugin());

    if (options.development) {
        config.plugins.push(new webpack.LoaderOptionsPlugin({ debug: true }));
    } else {
        config = config.merge({
            devtool: false,
            output: {
                pathinfo: false,
            },
            plugins: [
                new webpack.LoaderOptionsPlugin({ debug: false }),
                new CleanPlugin(options.outputPath, process.cwd()),
                plugins.uglify,
            ],
        });
    }

    if (options.enableRiskyOptimizations) {
        config.plugins.push(new HardSourcePlugin());
    }

    return config;
}
