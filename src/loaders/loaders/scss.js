import ExtractText from 'extract-text-webpack-plugin';

export default function (options) {
    return {
        test: /\.scss$/,
        loader: ExtractText.extract('style', options.loaders.css + '!sass'),
    };
};
