import StatsPlugin from 'stats-webpack-plugin';

export default function (options) {
    return new StatsPlugin('stats.json', {
        chunkModules: true,
    });
};
