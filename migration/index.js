const { default: migrationRunner } = require('node-pg-migrate');
const CONFIG = require('./config');

migrationRunner({
    ...CONFIG,
    direction: 'up',
});