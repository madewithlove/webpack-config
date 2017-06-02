import ExtractText from 'extract-text-webpack-plugin';
import expandLoaders from '../expandLoaders';

export default function (options) {
    const use = expandLoaders(options.loaders.css);

    return {
        test: /\.css$/,
        use: ExtractText.extract({fallback: 'style-loader', use}),
    };
}
