export default function (options) {
    return {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
    };
};
