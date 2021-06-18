'use strict';
var express = require('express');
const { getClasses, getFeats, getMagicSchools, getSpells } = require('./sqlite-client')

var api = express()
	.get('/spells', function (req, res) {
		getSpells()
			.then(results => res.send(results))
			.catch(console.error)
	})
	.get('/classes', function (req, res) {
		getClasses()
			.then(results => res.send(results))
			.catch(console.error)
	})
	.get('/magic_schools', function (req, res) {
		getMagicSchools()
			.then(results => res.send(results))
			.catch(console.error)
	})
	.get('/feats', function (req, res) {
		getFeats()
			.then(results => res.send(results))
			.catch(console.error)
	});

module.exports = api;
