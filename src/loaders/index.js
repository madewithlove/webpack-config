import css from './loaders/css';
import fonts from './loaders/fonts';
import html from './loaders/html';
import images from './loaders/images';
import js from './loaders/js';
import json from './loaders/json';
import scss from './loaders/scss';
import webfonts from './loaders/webfonts';
import fontgen from './loaders/fontgen';
import eslint from './loaders/eslint';
import baggage from './loaders/baggage';

export default function (options) {
    return {
        baggage: baggage(options),
        fontgen: fontgen(options),
        css: css(options),
        eslint: eslint(options),
        fonts: fonts(options),
        html: html(options),
        images: images(options),
        js: js(options),
        json: json(options),
        scss: scss(options),
        webfonts: webfonts(options),
    };
}

