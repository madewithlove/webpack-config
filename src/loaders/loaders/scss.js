import ExtractText from 'extract-text-webpack-plugin';
import expandLoaders from '../expandLoaders';

export default function (options) {
    const use = expandLoaders(`${options.loaders.css}!sass-loader`);

    return {
        test: /\.scss$/,
        use: ExtractText.extract({fallback: 'style-loader', use}),
    };
}
