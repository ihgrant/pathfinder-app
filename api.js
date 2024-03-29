'use strict';
const router = require('express-promise-router');

function initialize(databaseClient) {
	const { getClasses, getFeats, getMagicSchools, getSpells } = databaseClient
	const api = router()
		.get('/spells', function (req, res) {
			return getSpells().then(results => res.send(results))
		})
		.get('/classes', function (req, res) {
			return getClasses().then(results => res.send(results))
		})
		.get('/magic_schools', function (req, res) {
			return getMagicSchools().then(results => res.send(results))
		})
		.get('/feats', function (req, res) {
			return getFeats().then(results => res.send(results))
		})
		.use(function (error, req, res, next) {
			console.error(error)
			res.status(error.status || 500).send(error.message)
		})

	return api
}

module.exports = initialize;
