import assets from './assets';
import define from './define';
import occurenceOrder from './occurenceOrder';
import provide from './provide';
import stats from './stats';
import uglify from './uglify';

export default function (options) {
    return {
        assets: assets(options),
        define: define(options),
        occurenceOrder: occurenceOrder(options),
        provide: provide(options),
        stats: stats(options),
        uglify: uglify(options),
    };
}
