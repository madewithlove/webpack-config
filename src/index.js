import packagesTemplate from './templates/packages';
import applicationsTemplate from './templates/applications';
import templateFactory from './factory';

export default options => templateFactory(applicationsTemplate, options);
export const packages = options => templateFactory(packagesTemplate, options);
export const factory = templateFactory;
