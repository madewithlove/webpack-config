export default function (options) {
    return {
        test: /\.(png|gif|jpe?g|svg)/,
        loaders: [`url?limit=${options.inlineLimit}`, 'image-webpack?bypassOnDebug'],
    };
}
