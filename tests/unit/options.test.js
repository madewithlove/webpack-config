import options from '../../src/options';

it('can merge loader options', () => {
    const merged = options({
        loaders: {
            js: 'foo-loader',
            options: {
                'postcss-loader': {
                    foo: 'bar',
                },
            },
        },
    });

    expect(merged.loaders).toMatchSnapshot();
});
