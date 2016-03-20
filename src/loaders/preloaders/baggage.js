import path from 'path';

export default function (options) {
    return {
        test: /\.(js|ts)$/,
        loader: 'baggage-loader?[file].html=template&[file].scss',
        include: path.join(process.cwd(), options.sourcePath),
    };
};
