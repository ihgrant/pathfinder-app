'use strict';

var express = require('express');
var sqlite3 = require('sqlite3').verbose();

var db_path = 'data/pathfinder.sqlite';

var getSpellParams = function (query, caster) {
	var params = '';
	for (var x in query) {
		switch (x) {
			case 'start_lvl':
				params += ' AND '+caster+'>='+query[x];
				break;
			case 'end_lvl':
				params += ' AND '+caster+'<='+query[x];
				break;
			default:
				params += x+' LIKE "%'+query[x]+'%"';
		}
	}
	return params;
};

var api = express()
	.get('/spells/sorceror', function (req, res) {
		var db = new sqlite3.Database(db_path),
		query = 'SELECT * FROM spells_import WHERE sorceror!="NULL"',
		params = getSpellParams(req.query, 'sorceror');

		if (params.length) query = query + params;

		db.all(query, function (err, result) {
			if (err) {
				console.log(err, query);
			} else {
				res.send(result);
			}
		});
		db.close();
	})
	.get('/spells/:id', function (req, res) {
		var db = new sqlite3.Database(db_path);
		db.all('SELECT * FROM spells_import WHERE id='+req.params.id, function (err, result) {
			if (err) {
				console.log(err, query);
			} else {
				res.send(result);
			}
		});
		db.close();
	})
	.get('/spells', function (req, res) {
		var db = new sqlite3.Database(db_path),
		query = 'SELECT * FROM spells_import',
		params = getSpellParams(req.query);

		if (params.length) query = query + ' WHERE ' + params;

		db.all(query, function (err, result) {
			if (err) {
				console.log(err, query);
			} else {
				res.send(result);
			}
		});
		db.close();
	})
	.get('/users/:username', function (req, res) {
		var username = req.params.username;
		res.send({
			username: username,
			name: username.charAt(0).toUpperCase() + username.slice(1)
		});
	});

module.exports = api;
