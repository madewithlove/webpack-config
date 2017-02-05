export default function (options) {
    return {
        test: /\.(png|gif|jpe?g|svg)/,
        loaders: [`url-loader?limit=${options.inlineLimit}`, 'image-webpack-loader?bypassOnDebug'],
    };
};
