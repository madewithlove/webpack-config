export default function (options) {
    return {
        test: /\.(js|ts)$/,
        use: 'baggage-loader?[file].html=template&[file].scss',
        include: options.sourcePath,
        enforce: 'pre',
    };
}
