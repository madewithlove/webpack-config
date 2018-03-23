import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import expandLoaders from '../expandLoaders';

export default function(options) {
    const use = expandLoaders(
        options,
        `${options.loaders.css}!webfonts-loader?embed`,
    );

    return {
        test: /\.font\.(js|json)$/,
        use: [MiniCssExtractPlugin.loader, ...use],
    };
}
