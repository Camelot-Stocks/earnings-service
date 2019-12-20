// requires index.js
// pulls in schema
// requires fake data generator

const { pool } = require('./index.js');
const fs = require('fs');
const path = require('path');

const location = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(location).toString();
pool.query(schema)
    .then(res => console.log(res))
    .catch(err => console.error(err))
    .then(() => pool.query(`INSERT INTO company (name, symbol) VALUES ('Apple', 'AAPL');`))
    .then(res => console.log(res))
    .catch(err => console.log(err))


