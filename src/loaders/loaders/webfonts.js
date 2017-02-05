export default function (options) {
    return {
        test: /\.woff/,
        loader: 'url-loader',
        query: {
            limit: options.inlineLimit,
            mimetype: 'application/font-woff',
        },
    };
}
