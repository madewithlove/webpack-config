export default function () {
    return {
        test: /\.(ttf|eot)/,
        use: 'url-loader',
    };
}
