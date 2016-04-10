import packagesTemplate from './templates/packages';
import applicationsTemplate from './templates/applications';
import templateFactory from './factory';

// Export factory
export const factory = templateFactory;

// Export main template
const applicationsConfigurator = options => templateFactory(applicationsTemplate, options);
export default applicationsConfigurator;

// Export templates
export const applications = applicationsConfigurator;
export const packages = options => templateFactory(packagesTemplate, {
    ...options,
    sourcePath: 'src',
    outputPath: 'dist',
    react: false,
});

