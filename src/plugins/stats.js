import StatsPlugin from 'stats-webpack-plugin';

export default function () {
    return new StatsPlugin('stats.json', {
        chunkModules: true,
    });
};
