'use strict';
const path = require('path');
const express = require('express');
const Api = require('./api');
// const Api = require('./pg-api');

const development = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3001;
const app = express();

app
	.use('/api', Api)
	.use('/', express.static(path.join(__dirname, 'public')))
	.listen(port, function () {
		console.log('Point your browser at http://localhost:' + port);
	});
