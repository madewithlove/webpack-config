import AssetsPlugin from 'assets-webpack-plugin';

export default function (options) {
    return new AssetsPlugin({
        path: options.outputPath,
        filename: 'manifest.json',
        prettyPrint: true,
    });
}
