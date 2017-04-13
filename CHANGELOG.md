# CHANGELOG

## 6.0.6
### Fixed
- Fixed webfont generation support

## 6.0.5
### Fixed
- Fixed deprecated `contentBase` option when using `webpack-dev-server`

## 6.0.4
### Fixed
- Fixed `server` template 

## 6.0.2
### Fixed
- Fixed incorrect `NoEmitOnErrorsPlugin` plugin name

## 6.0.1
### Fixed
- Added missing loader prefixes

## 6.0.0
### Changed
- Initial Webpack 2 support

## 5.1.6
### Fixed
- Fix small regression

## 5.1.5
### Fixed
- Allow `testing` as environment instead of `test`

## 5.1.4
### Fixed
- Fixed context where no pre-existing env variable is set 

## 5.1.3
### Fixed
- Missing dependency

## 5.1.2
### Fixed
- Missing environment variable for `babel-preset-react-app`

## 5.1.1
### Fixed
- Missing dependency

## 5.1.0
### Added
- Added `CaseSensitivePathsPlugin` to prevent casing-related import issues

### Changed
- Use `react-app` babel preset as basis for babelrc, and `latest` for non React apps
- Better Uglify configuration
- Updated various dependencies

### Fixed
- Fixed typo in `OccurrenceOrderPlugin` plugin

## 5.0.1
### Changed
- Updated various dependencies

## 5.0.0
### Changed
- Updated various dependencies

### Removed
- Removed Angular and Typescript support

## 4.1.1
### Changed
- Updated various dependencies

## 4.1.0
### Changed
- The `ProvidePlugin` isn't included by default anymore (to encourage strict imports)

## 4.0.1
### Changed
- Updated `node-sass` to latest to work with Node 6

## 4.0.0
### Added
- Added `server` configuration template
- Added ability to specify whether using HMR through `webpack-dev-server` or something else
- Added `name` option to specify the name of the bundle

### Changed
- `config.entry` is now always an object (eg. `{main: 'src'}`) instead of an array like in 3.x (`['src']`)

### Fixed
- Fixed `process.env` being overriden by default

## 3.0.9
### Added
- Added `historyApiFallback` to `devServer` config for routing support in HMR mode

## 3.0.8
### Fixed
- Disable `MinChunkSize` until `ExtractText` bug is fixed

## 3.0.5
### Fixed
- Fixed environment getting overriden

## 3.0.4
### Fixed
- Fixed missin dist/ folder in export

## 3.0.3
### Fixed
- Fixed main exported file

## 3.0.2
### Fixed
- Fixed order of environment resolving

## 3.0.1
### Fixed
- Fixed ES5 compatibility

## 3.0.0
### Added
- Added packages configuration
- Added configuration factory
- Added separate modules for each loader and plugin

## 2.0.1
### Changed
- Update ESLint configuration

## 2.0.0
### Changed
- Added support for Babel 6
- Use `postcss-loader` and `autoprefixer` instead of now deprecated `autoprefixer-loader`
- Added support for linting (experimental)

## 1.2.6
### Fixed
- Disable removing of redundant attributes in minified HTML

## 1.2.5
### Fixed
- Fixed recursive merging of config options

## 1.2.4
### Changed
- Reenable MinChunkSize plugin now that it works with ExtractText

## 1.2.3
### Changed
- Updated vendor versions

## 1.2.2
### Fixed
- Missing babel configuration

## 1.2.1
### Fixed
- Missing ng-annotate on JS files

## 1.2.0
### Added
- Added support for Typescript
- Added support for Angular

## 1.1.2
### Fixed
- Fixed custom loaders not being added.

## 1.1.1
### Fixed
- Fixed hot module reloading

## 1.1.0
### Fixed
- Fixed file exists check. Again.

## 1.0.7
### Fixed
- Fixed file exists check. Again.

## 1.0.6
### Fixed
- Fixed `.env` file exists check

## 1.0.5
### Fixed
- Fixed incorrect `include` directive for baggage-loader

## 1.0.4
### Fixed
- Fixed fonts with query URLs (font-awesome, etc.) not being properly handled

## 1.0.3
### Changed
- `CommonChunksPlugin` is now only used in production mode
- `baggage-loader` now only runs on user files for faster builds

## 1.0.2
### Changed
- Loaders are now included as package dependencies

## 1.0.1
### Added
- Support for non Laravel environments

## 1.0.0
### Added
- Initial release
