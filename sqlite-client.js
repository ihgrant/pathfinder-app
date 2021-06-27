'use strict';
const sqlite3 = require('sqlite3').verbose();
const DB_PATH = 'data/pathfinder.sqlite';
const db = new sqlite3.Database(DB_PATH)

function runQuery(query) {
    return new Promise((resolve, reject) => {
        db.all(query, function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        });
    })
}

function getSpells() {
    return runQuery('SELECT * FROM spells_import')
}

function getClasses() {
    return runQuery('SELECT * FROM classes')
}

function getMagicSchools() {
    return runQuery('SELECT * FROM magic_schools')
}

function getFeats() {
    return runQuery('SELECT * FROM feats_import')
}

module.exports = {
    getClasses,
    getFeats,
    getMagicSchools,
    getSpells
};
