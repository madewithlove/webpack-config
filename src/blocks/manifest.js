import AssetsPlugin from 'assets-webpack-plugin';

export default () => ({options}) => ({
    plugins: [
        new AssetsPlugin({
            path: options.outputPath,
            filename: 'manifest.json',
            prettyPrint: true,
        }),
    ],
});