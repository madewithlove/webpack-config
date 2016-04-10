export default function (options) {
    return {
        test: /\.ts$/,
        loader: options.angular ? `ng-annotate!${options.loaders.ts}` : options.loaders.ts,
    };
};
