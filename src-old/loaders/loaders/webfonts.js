export default function (options) {
    return {
        test: /\.woff/,
        loader: 'url',
        query: {
            limit: options.inlineLimit,
            mimetype: 'application/font-woff',
        },
    };
}
