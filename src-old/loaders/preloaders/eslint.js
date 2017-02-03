export default function () {
    return {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
    };
}
