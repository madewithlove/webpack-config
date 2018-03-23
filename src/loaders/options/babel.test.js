import babel from './babel';

let config;

it('can enable React mode', () => {
    config = babel({
        react: true,
        sourcePath: 'foobar',
        loaders: {
            js: 'babel',
        },
    });

    expect(config).toMatchSnapshot();
});

it('can enable HMR', () => {
    config = babel({
        react: true,
        hot: true,
        sourcePath: 'foobar',
        loaders: {
            js: 'babel',
        },
    });

    expect(config).toMatchSnapshot();
});
