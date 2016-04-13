'use strict';

var mysql = require('mysql');
require('dotenv').config();
var connection = mysql.createConnection(process.env.MYSQL_URL);
var connection = mysql.createConnection(process.env.JAWSDB_URL || {
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASS,
  database: 'trivia'
});
connection.connect(function(err){
  if (err) {
    console.log("err: ", err);
  } else {
    console.log("connection success!");
  }

});

module.exports = connection;
