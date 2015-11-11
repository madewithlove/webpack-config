var ExtractText = require('extract-text-webpack-plugin');
var path        = require('path');
var merge       = require('merge');
var objectPath  = require('object-path');
var babelrc     = require('./babelrc');

module.exports = function (options) {
    return [

        //////////////////////////////////////////////////////////////////////
        ///////////////////////////// CORE ASSETS ////////////////////////////
        //////////////////////////////////////////////////////////////////////

        {
            test:   /\.css$/,
            loader: ExtractText.extract('style', options.cssLoaders),
        },
        {
            test:   /\.scss$/,
            loader: ExtractText.extract('style', options.cssLoaders + '!sass'),
        },
        {
            test:   /\.ts$/,
            loader: options.angular ? 'ng-annotate!' + options.tsLoaders : options.tsLoaders,
        },
        {
            test:    /\.js$/,
            loader:  'babel',
            include: path.join(process.cwd(), options.sourcePath),
            query:   options.react && options.hot ? babelrc : merge(babelrc, {env: {}}),
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
