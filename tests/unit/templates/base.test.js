import applications from '../../../src';

describe('templates/base', () => {
    let config;

    it('can enable Typescript mode', () => {
        config = applications({
            typescript: true,
        });

        expect(config.entry.main).toEqual(['./resources/assets/ts']);
    });
});
