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

export default packages({
    libraryName: 'WebpackConfig',
}).merge({
    target: 'node',
    externals: nodeModules,
});
