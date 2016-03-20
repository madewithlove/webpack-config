import webpack from 'webpack';

export default function (options) {
    return new webpack.optimize.OccurenceOrderPlugin(true);
}
