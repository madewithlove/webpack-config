import path from 'path';
import merge from 'merge';
import loaderOptions from './loaders/options';

export default function (options) {
    const env = process.env.BABEL_ENV || process.env.NODE_ENV || process.env.APP_ENV || 'development';
    const development = typeof options.development === 'undefined'
        ? env !== 'production'
        : options.development;

    options = merge.recursive({

        // Environment
        name: 'main',
        development,
        env,

        // HMR
        domain: process.env.APP_URL,
        hot: options.devServer === false ? development : process.argv.indexOf('--inline') !== -1,

        // Filenames and paths
        filenames: development ? '[name]' : '[name].[hash]',
        devServer: 'http://localhost:8080',
        sourcePath: 'resources/assets/js',
        outputPath: 'public/builds/',

        // Frameworks
        react: true,

        // Other options
        linting: false,
        inlineLimit: 50000,

        // Loaders
        loaders: {
            js: 'babel-loader',
            css: 'css-loader!postcss-loader',
            options: {},
        },

    }, options);

    // Add loader options
    options.loaders.options = merge.recursive(
        loaderOptions(options),
        options.loaders.options,
    );

    // Set NODE_ENV for babel-preset-react-app
    process.env.NODE_ENV = env
        .replace('local', 'development')
        .replace('testing', 'test');

    // Uniformize source path and entry point
    options.entry = options.sourcePath;
    options.sourcePath = path.resolve(path.dirname(options.sourcePath));

    return options;
}
