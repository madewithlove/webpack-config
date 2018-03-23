import expandLoaders from '../expandLoaders';

export default function(options) {
    return {
        test: /\.js$/,
        use: expandLoaders(options, options.loaders.js),
        include: options.sourcePath,
    };
}
