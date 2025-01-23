const pg = require('pg');

const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'sql_joins_syntax_heroes'
});

module.exports = pool;
