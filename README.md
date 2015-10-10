# Madewithlove Webpack configuration

## Installation

Install the package

```bash
$ npm install madewithlove-webpack-config --save-dev
```

Then any necessary loaders:

```bash
$ npm install css-loader babel-loader --save-dev
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
