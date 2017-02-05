import ExtractText from 'extract-text-webpack-plugin';

export default function (options) {
    return {
        test: /\.font\.json$/,
        loader: ExtractText.extract({fallback: 'style', use: `${options.loaders.css}!fontgen?embed`}),
    };
}
