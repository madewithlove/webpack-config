import path from 'path';
import {group, entryPoint, setOutput} from '@webpack-blocks/webpack2';
import withOptions from './withOptions';
import react from '../blocks/react';
import sass from '../blocks/sass';
import define from '../blocks/define';
import common from '../blocks/common';

export default withOptions(options => {
    const core = () => ({options}) => ({
        output: {
            publicPath: `/${options.outputPath.replace('public/', '')}`,
            chunkFilename: `${options.filenames.replace('hash', 'chunkhash')}.js`,
        },
    });

    return group([
        common(),
        sass(),
        react(),
        core(),
    ]);
});
