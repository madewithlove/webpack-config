const {createConfig} = require('@webpack-blocks/webpack2');
const application = require('../../dist').default;

let config = createConfig([
    application({
        sourcePath: 'src',
        outputPath: 'builds',
    }),
]);

console.log(config);

module.exports = config;
