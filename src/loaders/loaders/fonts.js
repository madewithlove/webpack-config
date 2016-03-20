export default function (options) {
    return {
        test: /\.(ttf|eot)/,
        loader: 'url',
    };
};
