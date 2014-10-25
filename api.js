'use strict';

var express = require('express');
var sqlite3 = require('sqlite3').verbose();

var DB_PATH = 'data/pathfinder.sqlite';

var getSpellParams = function (query) {
	var params = '';
	for (var x in query) {
		switch (x) {
			case 'start_lvl':
				params += ' AND '+query.clas+'>='+query[x];
				break;
			case 'end_lvl':
				params += ' AND '+query.clas+'<='+query[x];
				break;
			case 'clas':
				break;
			default:
				params += x+' LIKE "'+query[x].replace(/\*/g,'%')+'%"';
		}
	}
	return params;
};

var api = express()
	.get('/spells/sorceror', function (req, res) {
		var db = new sqlite3.Database(DB_PATH),
		query = 'SELECT * FROM spells_import WHERE sorceror!="NULL"',
		params = getSpellParams(req.query, 'sorceror');

		if (params.length) query = query + params;

		db.all(query, function (err, result) {
			if (err) {
				console.log(err, query);
			} else {
				res.send(result);
			}
			db.close();
		});
	})
	.get('/spells/:id', function (req, res) {
		var db = new sqlite3.Database(DB_PATH),
		query = 'SELECT * FROM spells_import WHERE id='+req.params.id;

		db.all(query, function (err, result) {
			if (err) {
				console.log(err, query);
			} else {
				res.send(result);
			}
			db.close();
		});
	})
	.get('/spells', function (req, res) {
		var db = new sqlite3.Database(DB_PATH),
		query = 'SELECT * FROM spells_import',
		params = getSpellParams(req.query);

		if (params.length) query = query + ' WHERE ' + params;

		db.all(query, function (err, result) {
			if (err) {
				console.log(err, query);
			} else {
				res.send(result);
			}
			db.close();
		});
	})
	.get('/classes', function (req, res) {
		var db = new sqlite3.Database(DB_PATH),
		query = 'SELECT * FROM classes';

		db.all(query, function (err, result) {
			if (err) {
				console.log(err, query);
			} else {
				res.send(result);
			}
			db.close();
		});
	})
	.get('/magic_schools', function (req, res) {
		var db = new sqlite3.Database(DB_PATH),
		query = 'SELECT * FROM magic_schools';

		db.all(query, function (err, result) {
			if (err) {
				console.log(err, query);
			} else {
				res.send(result);
			}
			db.close();
		});
	})
	.get('/feats', function (req, res) {
		var db = new sqlite3.Database(DB_PATH),
		query = 'SELECT * FROM feats_import';

		db.all(query, function (err, result) {
			if (err) {
				console.log(err, query);
			} else {
				res.send(result);
			}
			db.close();
		});
	})

	.get('/users/:username', function (req, res) {
		var username = req.params.username;
		res.send({
			username: username,
			name: username.charAt(0).toUpperCase() + username.slice(1)
		});
	});

module.exports = api;
