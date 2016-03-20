import path from 'path';
import merge from 'merge';
import babelrc from '../babelrc';

export default function (options) {
    const babelConfiguration = options.react && options.hot
        ? babelrc
        : {...babelrc, env: {}};

    // Append Babel configuration
    options.loaders.js += '?' + JSON.stringify(babelConfiguration);

    return {
        test: /\.js$/,
        loader: options.angular ? 'ng-annotate!' + options.loaders.js : options.loaders.js,
        include: path.join(process.cwd(), options.sourcePath),
    };
};
