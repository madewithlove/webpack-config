const parseQuery = require('webpack-parse-query');

export default (options, loaders) => {
    return loaders.split('!').map(rawLoader => {
        let [loader, parsed] = rawLoader.split('?');
        const defaults = options.loaders.options[loader] || {};
        parsed = parsed ? parseQuery(`?${parsed}`) : {};
        const loaderOptions = { ...defaults, ...parsed };

        return { loader, options: loaderOptions };
    });
};
