import path from 'path';
import applications from '../../../src';

describe('templates/applications', () => {
    let config;

    it('can change options depending on environment', () => {
        config = applications({
            development: true,
            outputPath: 'foobar',
        });

        expect(config.debug).toEqual(true);
        expect(config.output.path).toEqual(path.resolve('foobar'));
        expect(config.output.filename).not.toContain('[hash]');
        expect(config.output.filename).not.toContain('[hash]');

        config = applications({
            development: false,
            outputPath: 'foobar',
        });

        expect(config.debug).toEqual(false);
        expect(config.output.path).toEqual(path.resolve('foobar'));
        expect(config.output.filename).toContain('[hash]');
    });

    it('can enable HMR', () => {
        config = applications({
            hot: true,
        });

        expect(config.devServer.hot).toEqual(true);
    });

    it('can merge loaders and plugins', () => {
        config = applications({
            development: false,
            module: {
                loaders: [
                    {foo: 'bar'}
                ]
            },
            plugins: [
                {foo: 'bar'}
            ],
        });

        expect(config.module.loaders[0]).toEqual({foo: 'bar'});
        expect(config.plugins[0]).toEqual({foo: 'bar'});
    });

    it('can enable linting', () => {
        config = applications({
            linting: true,
        });

        expect(config.module.preLoaders[1].loader).toEqual('eslint-loader');
        expect(config.eslint.extends).toEqual('eslint-config-madewithlove');
    });
});
