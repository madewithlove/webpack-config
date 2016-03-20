import expect from 'expect';
import applications from '../../../src';

describe('templates/base', () => {
    let config;

    it('can enable Typescript mode', () => {
        config = applications({
            typescript: true,
        });

        expect(config.entry[0]).toBe('./resources/assets/ts');
    });
});
