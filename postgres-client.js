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
                params += ' AND ' + query.clas + '>=' + query[x];
                break;
            case 'end_lvl':
                params += ' AND ' + query.clas + '<=' + query[x];
                break;
            case 'clas':
                break;
            default:
                params += x + ' LIKE "' + query[x].replace(/\*/g, '%') + '%"';
        }
    }
    return params;
};

function runQuery(query) {
    return new Promise((resolve, reject) => {
        pg.connect(DB_PATH, function (err, client, done) {
            if (err) {
                reject(err)
            } else {
                client.query(query, function (err, result) {
                    done();
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result.rows);
                    }
                });
            }
        });
    })
}

function getClasses() {
    return runQuery('SELECT * FROM classes')
}

function getFeats() {
    return runQuery('SELECT * FROM feats_import')
}

function getMagicSchools() {
    return runQuery('SELECT * FROM magic_schools')
}

function getSpellById(id) {
    return runQuery('SELECT * FROM spells_import WHERE id=' + req.params.id)
}

function getSpells() {
    return runQuery('SELECT * FROM spells_import')
}

module.exports = { getClasses, getFeats, getMagicSchools, getSpells }
