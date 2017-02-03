import webpack from 'webpack';

export default () => ({options}) => ({
    plugins: [
        new webpack.DefinePlugin({
            '__SERVER__': options.development,
            '__DEVELOPMENT__': options.development,
            '__DEVTOOLS__': options.development,
            'process.env.BABEL_ENV': JSON.stringify(options.env),
            'process.env.NODE_ENV': JSON.stringify(options.env),
        })
    ],
});