'use strict';

var path = require('path');
var express = require('express');
//var Api = require('./api');
var Api = require('./pg-api');

var development = process.env.NODE_ENV !== 'production';
var port = process.env.PORT || 3001;
var app = express();

app
	.use('/api', Api)
	.use('/', express.static(path.join(__dirname, 'public')))
	.listen(port, function () {
		console.log('Point your browser at http://localhost:'+port);
	});
