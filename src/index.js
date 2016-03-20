import packagesTemplate from './templates/packages';
import applicationsTemplate from './templates/applications';
import templateFactory from './factory';

export const factory = templateFactory;

export default options => templateFactory(applicationsTemplate, options);
export const packages = options => templateFactory(packagesTemplate, {...options,
    sourcePath: 'src',
    outputPath: 'dist',
    react: false,
});

