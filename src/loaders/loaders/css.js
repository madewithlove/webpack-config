import ExtractText from 'extract-text-webpack-plugin';
import expandLoaders from '../expandLoaders';

export default function (options) {
    const use = expandLoaders(options.loaders.css);

    return {
        test: /\.css$/,
        loader: ExtractText.extract({fallback: 'style', use}),
    };
};
