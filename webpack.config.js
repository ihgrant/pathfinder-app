var webpack = require('webpack');

var plugins = [
    new webpack.ProvidePlugin({
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify('production')
    }));
}

module.exports = {
    entry: './components/app.js',
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader' },
        ]
    },
    output: {
        filename: './public/js/bundle.js'
    },
    plugins: plugins
};
