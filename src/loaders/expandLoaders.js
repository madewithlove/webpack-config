import babelrc from './babelrc';

export default (options, loaders) => {
    return loaders.split('!').map(loader => {
        let loaderOptions = {};

        switch (loader) {
            case 'postcss-loader':
                loaderOptions = options.loaders.postcss;
                break;

            case 'babel-loader':
                loaderOptions = babelrc(options);
                break;
        }

        return {loader, options: loaderOptions};
    });
};
