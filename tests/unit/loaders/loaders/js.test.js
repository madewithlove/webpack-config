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

        expect(config.loader).toInclude('react');
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

        expect(config.loader).toInclude('react-hmre');
    });
});
