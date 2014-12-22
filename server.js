'use strict';

var path = require('path');
var url = require('url');
var express = require('express');
var browserify = require('connect-browserify');
var ReactAsync = require('react-async');
var nodejsx = require('node-jsx').install();
// var Api = require('./api');
var Api = require('./pg-api');
var App = require('./client');

var development = process.env.NODE_ENV !== 'production';
var port = process.env.PORT || 3001;

function renderApp(req, res, next) {
	var path = url.parse(req.url).pathname;
	var app = App({path: path});
	ReactAsync.renderComponentToStringWithAsyncState(app, function (err, markup) {
		if (err) {
			return next(err);
		}
		res.send('<!doctype html>\n' + markup);
	});
}

var app = express();

if (development) {
	app.get('/assets/bundle.js',
		browserify('./client', {
			debug: true,
			watch: true
		}));
}

app
	.use('/assets', express.static(path.join(__dirname, 'assets')))
	.use('/api', Api)
	.use(renderApp)
	.listen(port, function () {
		console.log('Point your browser at http://localhost:'+port);
	});
