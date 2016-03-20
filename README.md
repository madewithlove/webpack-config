# Madewithlove Webpack configuration

## Installation

Install the package

```bash
$ npm install madewithlove-webpack-config --save-dev
```

## Usage

### Basic usage

**webpack.config.js**
```js
module.exports = require('madewithlove-webpack-config')();
```

You can also fine-tune aspects of the configuration:

**webpack.config.js**
```js
module.exports = require('madewithlove-webpack-config')({
    react: true,
    sourcePath: 'src',
    outputPath: 'builds',
});
```

### Advanced usage

**webpack.config.js**
```js
var config = require('madewithlove-webpack-config')();

module.exports = config.merge({
    module: {
        loaders: [
            // Append a loader
        ],
    }
    plugins: [
        // Append a plugin
    ],
});
```

### Using templates

**webpack.config.js**
```js
var factory = require('madewithlove-webpack-config').factory;
var template = function (config, options, loaders, plugins) {
    return config.merge({
        devtool: options.development ? 'foo' : 'bar',
        module: {
            loaders: [loaders.css, loaders.js],
        },
        plugins: [plugins.uglify]
    });
};

module.exports = factory(template);
```
