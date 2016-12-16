import fs from 'fs';
import dotenv from 'dotenv';
import optionsFactory from './options';
import loadersFactory from './loaders';
import pluginsFactory from './plugins';
import baseConfiguration from './templates/base';

/**
 * Create a Webpack configuration
 *
 * @param {Function} configuration
 * @param {Object} options
 *
 * @returns {Object}
 */
export default function (configuration, options = {}) {
    // Require dotenv variables
    const dotenvFile = `${process.cwd()}/.env`;
    try {
        if (fs.statSync(dotenvFile).isFile()) {
            dotenv.load({path: dotenvFile});
        }
    } catch (errors) {
        // ...
    }

    // Create options, loaders and plugins
    options = optionsFactory(options);
    const loaders = loadersFactory(options);
    const plugins = pluginsFactory(options);
    const config = baseConfiguration(options, loaders, plugins);

    return configuration(config, options, loaders, plugins);
}
