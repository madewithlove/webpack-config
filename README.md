# Madewithlove Webpack configuration

## Installation

Install the package

```bash
$ npm install madewithlove-webpack-config --save-dev
```

## Usage

### Basic usage

**webpack.config.babel.js**
```js
import config from 'madewithlove-webpack-config';

export default config();
```

You can also fine-tune aspects of the configuration:

**webpack.config.babel.js**
```js
import config from 'madewithlove-webpack-config';

export default config({
    react: true,
    sourcePath: 'src',
    outputPath: 'builds',
});
```

### Advanced usage

**webpack.config.babel.js**
```js
import config from 'madewithlove-webpack-config';

export default config().merge({
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

**webpack.config.babel.js**
```js
import {factory} from 'madewithlove-webpack-config';

const template = (config, options, loaders, plugins) => {
    return config.merge({
        devtool: options.development ? 'foo' : 'bar',
        module: {
            loaders: [
                loaders.css,
                loaders.js,
                {
                    test: options.someExtraOption,
                }
            ],
        },
        plugins: [plugins.uglify]
    });
};

export default factory(template, {
    someExtraOption: 'foo',
});
```
