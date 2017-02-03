import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';

export default () => ({options}) => {
    if (options.development) {
        return {};
    }

    return {
        devtool: 'source-map',
        output: {
            pathinfo: false,
        },
        node: {
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
        },
        plugins: [
            new CleanPlugin(options.outputPath, process.cwd()),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    screw_ie8: true,
                    warnings: false
                },
                mangle: {
                    screw_ie8: true
                },
                output: {
                    comments: false,
                    screw_ie8: true
                }
            }),
        ],
    };
};