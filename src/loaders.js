var ExtractText = require('extract-text-webpack-plugin');
var path        = require('path');
var merge       = require('merge');
var objectPath  = require('object-path');
var babelrc     = require('./babelrc');

module.exports = function (options) {

    // Append Babel configuration
    var babelConfiguration = options.react && options.hot ? babelrc : merge(babelrc, {env: {}});
    options.loaders.js += '?' + JSON.stringify(babelConfiguration);

    return [

        //////////////////////////////////////////////////////////////////////
        ///////////////////////////// CORE ASSETS ////////////////////////////
        //////////////////////////////////////////////////////////////////////

        {
            test:   /\.css$/,
            loader: ExtractText.extract('style', options.loaders.css),
        },
        {
            test:   /\.scss$/,
            loader: ExtractText.extract('style', options.loaders.css + '!sass'),
        },
        {
            test:   /\.ts$/,
            loader: options.angular ? 'ng-annotate!' + options.loaders.ts : options.loaders.ts,
        },
        {
            test:    /\.js$/,
            loader:  options.angular ? 'ng-annotate!' + options.loaders.js : options.loaders.js,
            include: path.join(process.cwd(), options.sourcePath),
        },
        {
            test:   /\.html$/,
            loader: options.angular ? 'ngtemplate!html' : 'html',
        },
        {
            test:   /\.json/,
            loader: 'json',
        },

        //////////////////////////////////////////////////////////////////////
        ////////////////////////// IMAGES AND FONTS //////////////////////////
        //////////////////////////////////////////////////////////////////////

        {
            test:   /\.woff/,
            loader: 'url',
            query:  {
                limit:    options.inlineLimit,
                mimetype: 'application/font-woff',
            },
        },
        {
            test:   /\.(ttf|eot)/,
            loader: 'url',
        },
        {
            test:    /\.(png|gif|jpe?g|svg)/,
            loaders: ['url?limit=' + options.inlineLimit, 'image-webpack?bypassOnDebug'],
        },

    ].concat(objectPath.get(options, 'module.loaders', []));
};
