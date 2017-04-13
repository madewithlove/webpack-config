import ExtractText from 'extract-text-webpack-plugin';
import expandLoaders from '../expandLoaders';

export default function (options) {
    const use = expandLoaders(`${options.loaders.css}!webfonts-loader?embed`);

    return {
        test: /\.font\.(js|json$)/,
        loader: ExtractText.extract({fallback: 'style-loader', use}),
    };
}
