import autoprefixer from 'autoprefixer';

export default options => ({
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
});
