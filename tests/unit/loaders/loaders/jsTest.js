import expect from 'expect';
import loader from '../../../../src/loaders/loaders/js';

describe('loaders/loaders/js', () => {
    let config;

    it('can enable React mode', () => {
        config = loader({
            react: true,
            sourcePath: 'foobar',
            loaders: {
                js: 'babel',
            }
        });

        expect(config.loader).toBe('babel?{"cacheDirectory":true,"presets":["es2015","react","stage-0"],"plugins":["transform-decorators-legacy"],"env":{}}');
    });

    it('can enable HMR', () => {
        config = loader({
            react: true,
            hot: true,
            sourcePath: 'foobar',
            loaders: {
                js: 'babel',
            }
        });

        expect(config.loader).toBe('babel?{"cacheDirectory":true,"presets":["es2015","react","stage-0"],"plugins":["transform-decorators-legacy"],"env":{"development":{"presets":["react-hmre"]},"production":{"ast":false,"compact":true}}}');
    });

    it('can enable Angular', () => {
        config = loader({
            react: false,
            angular: true,
            sourcePath: 'foobar',
            loaders: {
                js: 'babel',
            }
        });

        expect(config.loader).toBe('ng-annotate!babel?{"cacheDirectory":true,"presets":["es2015","react","stage-0"],"plugins":["transform-decorators-legacy"],"env":{}}');
    });
});
