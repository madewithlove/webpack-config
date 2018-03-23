import path from 'path';
import webpack from 'webpack';
import { factory } from '../../src';

it('can create custom configuration from template', () => {
    const template = (config, options, loaders, plugins) => {
        return config.merge({
            module: {
                rules: [
                    loaders.css,
                    {
                        test: /\.foo/,
                        use: options.foo,
                    },
                ],
            },
            plugins: [plugins.occurenceOrder],
        });
    };

    const config = factory(template, {
        foo: 'bar',
        outputPath: 'foobar',
    });

    expect(config.output.path).toEqual(path.resolve('foobar'));
    expect(config.module.rules[0].test).toEqual(/\.css$/);
    expect(config.module.rules[1].use).toEqual('bar');
});
