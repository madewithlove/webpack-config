export default function (options) {
    return {
        test: /\.html$/,
        loader: options.angular ? 'ngtemplate!html?removeRedundantAttributes=false' : 'html',
    };
};
