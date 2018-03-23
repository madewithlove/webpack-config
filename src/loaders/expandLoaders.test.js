import expandLoaders from './expandLoaders';

it('can expand query with options', () => {
    const options = {
        loaders: {
            options: {
                'foo-loader': {
                    baz: 50,
                },
                'bar-loader': {
                    qul: 25,
                },
                'qux-loader': {
                    jinx: true,
                },
            },
        },
    };
    const expanded = expandLoaders(
        options,
        'foo-loader?bar!bar-loader?baz=qux',
    );

    expect(expanded).toMatchSnapshot();
});
