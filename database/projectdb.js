'use strict'
const dbconfig = {
    host     : 'localhost',
    user     : 'project',
    password : 'projectPWD',
    database : 'projectdb'
};

var mysql = require('mysql')
var pool = mysql.createPool(dbconfig)

module.exports = {
    getPool: function () {
        if (pool) return pool;
        else return (pool = mysql.createPool(dbconfig))
    },
    execute: function (sql, callback) {
        let conn = mysql.createConnection(dbconfig);
        conn.connect();
        conn.query(sql, function (err, rows, fields) {
            if (err) console.log("[mysql Error]", err);
            // conn.release();
            conn.end();
            return callback(err, rows,fields);
        }.bind(this));
    }
};

