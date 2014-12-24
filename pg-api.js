/* jshint node:true */
'use strict';

var express = require('express');
var pg = require('pg');

var DB_PATH = process.env.DATABASE_URL
	|| 'postgres://ian@localhost/ian';

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
		pg.connect(DB_PATH, function(err, client, done) {
			if (err) {
				res.status(500).send(err);
			} else {
				var query = 'SELECT * FROM spells_import WHERE sorceror!="NULL"',
				params = getSpellParams(req.query, 'sorceror');
				if (params.length) query = query + params;
				client.query(query, function (err, result) {
					done();
					console.log(result.rows);
					if (err) {
						console.log(err, query);
					} else {
						res.send(result.rows);
					}
				});
			}
		});
	})
	.get('/spells/:id', function (req, res) {
		pg.connect(DB_PATH, function(err, client, done) {
			if (err) {
				res.status(500).send(err);
			} else {
				var query = 'SELECT * FROM spells_import WHERE id='+req.params.id;
				client.query(query, function (err, result) {
					done();
					if (err) {
						console.log(err, query);
					} else {
						res.send(result.rows);
					}
				});
			}
		});
	})
	.get('/spells', function (req, res) {
		pg.connect(DB_PATH, function(err, client, done) {
			if (err) {
				res.status(500).send(err);
			} else {
				var query = 'SELECT * FROM spells_import';
				client.query(query, function (err, result) {
					done();
					if (err) {
						console.log(err, query);
					} else {
						res.send(result.rows);
					}
				});
			}
		});
	})
	.get('/classes', function (req, res) {
		pg.connect(DB_PATH, function(err, client, done) {
			if (err) {
				res.status(500).send(err);
			} else {
				var query = 'SELECT * FROM classes';
				client.query(query, function (err, result) {
					done();
					if (err) {
						console.log(err, query);
					} else {
						res.send(result.rows);
					}
				});
			}
		});
	})
	.get('/magic_schools', function (req, res) {
		pg.connect(DB_PATH, function(err, client, done) {
			if (err) {
				res.status(500).send(err);
			} else {
				var query = 'SELECT * FROM magic_schools';
				client.query(query, function (err, result) {
					done();
					if (err) {
						console.log(err, query);
					} else {
						res.send(result.rows);
					}
				});
			}
		});
	})
	.get('/feats', function (req, res) {
		pg.connect(DB_PATH, function(err, client, done) {
			if (err) {
				res.status(500).send(err);
			} else {
				var query = 'SELECT * FROM feats_import';
				client.query(query, function (err, result) {
					done();
					if (err) {
						console.log(err, query);
					} else {
						res.send(result.rows);
					}
				});
			}
		});
	});

module.exports = api;
