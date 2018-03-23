import templateFactory from './factory';
import applicationsTemplate from './templates/applications';
import packagesTemplate from './templates/packages';
import serverTemplate from './templates/server';

// Export main template
const applicationsConfigurator = options =>
    templateFactory(applicationsTemplate, options);
export default applicationsConfigurator;

// Factory
//////////////////////////////////////////////////////////////////////

export const factory = templateFactory;

// Templates
//////////////////////////////////////////////////////////////////////

export const application = applicationsConfigurator;

export const server = options =>
    templateFactory(serverTemplate, {
        ...options,
        filenames: '[name]',
        devServer: false,
    });

export const packages = options =>
    templateFactory(packagesTemplate, {
        ...options,
        sourcePath: 'src',
        outputPath: 'dist',
        react: false,
    });
