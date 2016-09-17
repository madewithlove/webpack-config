import path from 'path';
import webpack from 'webpack';
import {factory} from '../../src';

describe('factory', () => {
    it('can create custom configuration from template', () => {
        const template = (config, options, loaders, plugins) => {
            return config.merge({
                module: {
                    loaders: [
                        loaders.css,
                        {
                            test: /\.foo/,
                            loader: options.foo,
                        }
                    ]
                },
                plugins: [
                    plugins.occurenceOrder,
                ]
            });
        };

        const config = factory(template, {
            foo: 'bar',
            outputPath: 'foobar',
        });

        expect(config.devtool).toEqual('eval');
        expect(config.output.path).toEqual(path.resolve('foobar'));
        expect(config.module.loaders[0].test).toEqual(/\.css$/);
        expect(config.module.loaders[1].loader).toEqual('bar');
        expect(config.plugins[1]).toEqual(new webpack.optimize.OccurenceOrderPlugin(true));
    });
});
