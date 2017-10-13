var config = require('../../dist').default;
var server = require('../../dist').server;

module.exports = [
    config({
        enableRiskyOptimizations: true,
        sourcePath: 'src',
        outputPath: 'builds',
    }),
    server({
        enableRiskyOptimizations: true,
        sourcePath: 'src/server.js',
        outputPath: 'builds',
    }),
];
