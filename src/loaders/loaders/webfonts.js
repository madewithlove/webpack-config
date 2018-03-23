export default function(options) {
    return {
        test: /\.woff/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: options.inlineLimit,
                    mimetype: 'application/font-woff',
                },
            },
        ],
    };
}
