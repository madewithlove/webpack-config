import autoprefixer from 'autoprefixer';

export default loaders => {
    return loaders.split('!').map(loader => {
        const postcss = {
            plugins() {
                return [
                    autoprefixer({
                        browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9',
                        ],
                    }),
                ];
            },
        };

        return {loader, options: loader === 'postcss-loader' ? postcss : {}};
    });
};
