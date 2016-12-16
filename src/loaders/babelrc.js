export default function (options) {
    const presets = options.react ? ['es2015', 'react', 'stage-0'] : ['es2015', 'stage-0'];
    if (options.react && options.hot) {
        presets.push('react-hmre');
    }

    return {
        cacheDirectory: true,
        presets,
        plugins: ['transform-decorators-legacy'],
        env: {
            production: {
                ast: false,
                compact: true,
            },
        },
    };
}
