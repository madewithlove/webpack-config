export default function (options) {
    return {
        test: /\.(js|ts)$/,
        loader: 'baggage-loader?[file].html=template&[file].scss',
        include: options.sourcePath,
    };
};
