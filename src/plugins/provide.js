import webpack from 'webpack';

export default function () {
    return new webpack.ProvidePlugin({
        $: 'jquery',
        _: 'lodash',
        jQuery: 'jquery',
    });
};
