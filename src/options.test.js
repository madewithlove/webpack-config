import options from './options';

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
