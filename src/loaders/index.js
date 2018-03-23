import css from './loaders/css';
import fontgen from './loaders/fontgen';
import fonts from './loaders/fonts';
import html from './loaders/html';
import images from './loaders/images';
import js from './loaders/js';
import scss from './loaders/scss';
import vue from './loaders/vue';
import webfonts from './loaders/webfonts';

export default function(options) {
    return {
        css: css(options),
        fontgen: fontgen(options),
        fonts: fonts(options),
        html: html(options),
        images: images(options),
        js: js(options),
        scss: scss(options),
        vue: vue(options),
        webfonts: webfonts(options),
    };
}
