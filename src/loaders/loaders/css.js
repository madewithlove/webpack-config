import ExtractText from 'extract-text-webpack-plugin';

export default function (options) {
    return {
        test: /\.css$/,
        loader: ExtractText.extract('style', options.loaders.css),
    };
}
