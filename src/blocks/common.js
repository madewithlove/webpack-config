import {group} from '@webpack-blocks/webpack2';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import define from '../blocks/define';
import manifest from '../blocks/manifest';
import optimizations from '../blocks/optimizations';

const options = () => ({options}) => ({
    devtool: 'eval',
    entry: {
        [options.name]: [`./${options.entry}`],
    },
    output: {
        path: path.resolve(options.outputPath),
        filename: `${options.filenames}.js`,
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({debug: options.development}),
        new CaseSensitivePathsPlugin(),
    ],
});

export default () => group([
    options(),
    define(),
    manifest(),
    optimizations(),
]);