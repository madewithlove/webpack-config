import path from 'path';

export default function (config, options, loaders, plugins) {
    return config.merge({
        module: {
            rules: [
                loaders.js,
                loaders.json,
            ],
        },
        output: {
            path: path.resolve(options.outputPath),
            filename: 'index.js',
            library: options.libraryName,
            libraryTarget: 'umd',
        },
        plugins: [
            plugins.occurenceOrder,
        ],
    });
}
