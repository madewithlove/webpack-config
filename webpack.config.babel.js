import {packages} from './src';
import fs from 'fs';

const nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

const config = packages({
    libraryName: 'WebpackConfig'
}).merge({
    target: 'node',
    externals: nodeModules,
});

// Remove DefinePlugin since we use it internally
config.plugins = config.plugins.slice(1);

export default config;
