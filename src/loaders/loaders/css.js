import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import expandLoaders from '../expandLoaders';

export default function (options) {
    const use = expandLoaders(options, options.loaders.css);

    return {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, ...use],
    };
}
