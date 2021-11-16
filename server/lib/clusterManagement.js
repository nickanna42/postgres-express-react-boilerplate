// This file contains the operations that need to
// be performed before the cluster can fork and the
// HttpServer threads can be instantiated.

const CONFIG = require('../config');
const { Pool } = require('pg');

function masterStart() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

function forkStart() {
  return new Promise(function(resolve, reject) {
    global.dbPool = new Pool({
      user: CONFIG.DB_USER,
      password: CONFIG.DB_PASS,
      host: CONFIG.DB_HOST,
      port: CONFIG.DB_PORT,
    });
    resolve();
  });
}
  
  module.exports =  { forkStart, masterStart };