import ExtractText from 'extract-text-webpack-plugin';

export default function (options) {
    return {
        test: /\.scss$/,
        loader: ExtractText.extract({fallback: 'style-loader', use: `${options.loaders.css}!sass-loader`}),
    };
}
