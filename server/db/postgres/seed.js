const { pool } = require('./index.js');
const fs = require('fs');
const path = require('path');
const log = require('fancy-log');
const queriesArray = require('./dataGenerator.js').queriesArray;

log('boom from seed');

function sendAllQueries(queriesArray) {
    batch = 0;
    return queriesArray.reduce((chain, currentQuery) => {
        return chain.then(() => {
            log('performing next query', batch);
            pool.query(currentQuery);
            batch++;
        })
    }, Promise.resolve());
}

const location = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(location).toString();
pool.query(schema)
    .then(res => log('schema loaded'))
    .catch(err => log.error(err))
    .then(() => sendAllQueries(queriesArray))
    .then(res => log('seed successful'))
    .catch(err => log.error(err))


