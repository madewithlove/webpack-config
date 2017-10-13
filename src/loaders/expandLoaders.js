export default (options, loaders) => {
    return loaders.split('!').map(loader => {
        return { loader, options: options.loaders.options[loader] || {} };
    });
};
