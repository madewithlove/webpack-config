export default function (options) {
    const presets = options.react ? ['latest', 'react', 'stage-0'] : ['latest', 'stage-0'];
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
