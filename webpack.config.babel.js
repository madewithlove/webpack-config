import {packages} from './src';
import nodeExternals from 'webpack-node-externals';

const config = packages({
    libraryName: 'WebpackConfig'
}).merge({
    target: 'node',
    externals: [nodeExternals()],
});

// Remove DefinePlugin since we use it internally
config.plugins = config.plugins.slice(1);

export default config;
