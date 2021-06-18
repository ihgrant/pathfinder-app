'use strict';
const { getClasses, getFeats, getMagicSchools, getSpells } = require('./sqlite-client')
const router = require('express-promise-router');

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
	});

module.exports = api;
