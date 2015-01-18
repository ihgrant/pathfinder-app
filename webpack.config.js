module.exports = {
  entry: './components/app.js',
  output: {
    filename: './public/js/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader?harmony' },
    ]
  }
};
