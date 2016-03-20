export default function (options) {
    return {
        cacheDirectory: true,
        presets: options.react ? ['es2015', 'react', 'stage-0'] : ['es2015', 'stage-0'],
        plugins: ['transform-runtime', 'transform-decorators-legacy'],
        env: {
            development: {
                presets: (options.react && options.hot) ? ["react-hmre"] : [],
            },
            production: {
                ast: false,
                compact: true
            }
        }
    };
};
