import webpack from 'webpack';

export default function (options) {
    return new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
            screw_ie8: true,
            warnings: false,
        }
    })
};
