import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import expandLoaders from '../expandLoaders';

export default function(options) {
    let use = expandLoaders(options, `${options.loaders.css}`);
    use.push({
        loader: 'webfonts-loader',
        options: {
            embed: true,
        }
    });

    return {
        test: /\.font\.(js|json)$/,
        use: [MiniCssExtractPlugin.loader, ...use],
    };
}
