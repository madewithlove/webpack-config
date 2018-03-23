import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import expandLoaders from '../expandLoaders';

export default function(options) {
    const use = expandLoaders(options, `${options.loaders.css}!sass-loader`);

    return {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, ...use],
    };
}
