export default options => {
    return {
        presets: options.react ? ['react-app', 'stage-0'] : ['env', 'stage-0'],
        plugins: ['transform-decorators-legacy'],
    };
};
