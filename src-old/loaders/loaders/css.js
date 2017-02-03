import ExtractText from 'extract-text-webpack-plugin';

export default function (options) {
    return {
        test: /\.css$/,
        loader: ExtractText.extract({fallbackLoader: 'style', loader: options.loaders.css}),
    }
};
