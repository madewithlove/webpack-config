import babelrc from '../babelrc';

export default function (options) {
    // Append Babel configuration
    options.loaders.js += '?' + JSON.stringify(babelrc(options));

    return {
        test: /\.js$/,
        loader: options.angular ? `ng-annotate!${options.loaders.js}` : options.loaders.js,
        include: options.sourcePath,
    };
};
