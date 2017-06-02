export default function (options) {
    return {
        test: /\.woff/,
        use: 'url-loader',
        query: {
            limit: options.inlineLimit,
            mimetype: 'application/font-woff',
        },
    };
}
