export default function (config, options, loaders, plugins) {
    return config.merge({
        module: {
            loaders: [
                loaders.js,
                loaders.json,
            ],
        },
        output: {
            path: options.outputPath,
            filename: 'index.js',
            library: options.libraryName,
            libraryTarget: 'umd'
        },
        plugins: [
            plugins.occurenceOrder,
        ]
    });
};
