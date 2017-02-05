import babelrc from '../babelrc';

export default function (options) {
    // Append Babel configuration
    options.loaders.js += `?${JSON.stringify(babelrc(options))}`;

    return {
        test: /\.js$/,
        loader: options.loaders.js,
        include: options.sourcePath,
    };
};
