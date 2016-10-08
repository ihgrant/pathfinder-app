module.exports = {
    entry: './components/app.js',
    output: {
        filename: './public/js/bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader' },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ]
};
