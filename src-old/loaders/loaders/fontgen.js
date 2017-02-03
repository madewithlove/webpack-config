import ExtractText from 'extract-text-webpack-plugin';

export default function (options) {
    return {
        test: /\.font\.json$/,
        loader: ExtractText.extract({fallbackLoader: 'style', loader: `${options.loaders.css}!fontgen?embed`}),
    };
}
