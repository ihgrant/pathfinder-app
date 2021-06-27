'use strict';
const path = require('path');
const express = require('express');
const initializeApi = require('./api');

const { DATABASE_CLIENT, NODE_ENV, PORT } = process.env
const port = PORT || 3001;
const app = express();
const usePostgresClient = NODE_ENV === 'production' || DATABASE_CLIENT === 'postgres'
const databaseClient = usePostgresClient
	? require('./postgres-client')
	: require('./sqlite-client')
const api = initializeApi(databaseClient)

app
	.use('/api', api)
	.use('/', express.static(path.join(__dirname, 'dist')))
	.listen(port, function () {
		console.info('server listening on port ' + port);
		console.info('using ' + (usePostgresClient ? 'postgres' : 'sqlite') + ' database client')
	});
