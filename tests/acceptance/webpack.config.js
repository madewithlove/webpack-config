var config = require('../../dist').default;
var server = require('../../dist').server;

module.exports = [
    config({
        sourcePath: 'src',
        outputPath: 'builds',
    }),
    server({
        sourcePath: 'src/server.js',
        outputPath: 'builds',
    }),
];
