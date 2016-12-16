import webpack from 'webpack';

export default function () {
    return new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
            screw_ie8: true,
            warnings: false,
        },
    });
}
