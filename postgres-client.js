/* jshint node:true */
'use strict';
const express = require('express');
const pg = require('pg');

console.info('using postgres client')
const { DATABASE_URL, NODE_ENV } = process.env
let DB_PATH = DATABASE_URL
    ? DATABASE_URL
    : 'postgres://postgres@localhost/pathfinder';

// if (NODE_ENV === 'production') {
//     DB_PATH += '?sslmode=require'
// }
console.info('connecting to ' + DB_PATH)

function getSpellParams(query) {
    let params = '';
    for (let x in query) {
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
