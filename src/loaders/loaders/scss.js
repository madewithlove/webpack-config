import ExtractText from 'extract-text-webpack-plugin';
import expandLoaders from '../expandLoaders';

export default function (options) {
    const use = expandLoaders(`${options.loaders.css}!sass-loader`);

    return {
        test: /\.scss$/,
        loader: ExtractText.extract({fallback: 'style-loader', use}),
    };
}
