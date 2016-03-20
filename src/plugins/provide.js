import webpack from 'webpack';

export default function (options) {
    return new webpack.ProvidePlugin({
        $: 'jquery',
        _: 'lodash',
        jQuery: 'jquery',
    });
};
