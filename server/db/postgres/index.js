const { Pool } = require('pg');

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'camelot_earnings',
    password: 'p4ssw0rd',
    port: 5432
})


module.exports = { pool };
