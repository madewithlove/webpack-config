import babel from './babel';
import postcss from './postcss';

export default options => ({
    'babel-loader': babel(options),
    'postcss-loader': postcss(options),
});
