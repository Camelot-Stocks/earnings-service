const { pool } = require('./index.js');
const fs = require('fs');
const path = require('path');
const queriesArray = require('./dataGenerator.js').queriesArray;

function sendAllQueries(queriesArray) {
    batch = 0;
    return queriesArray.reduce((chain, currentQuery) => {
        return chain.then(() => {
            pool.query(currentQuery);
            batch++;
            console.log('performing next query', batch);
        })
    }, Promise.resolve());
}

const location = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(location).toString();
pool.query(schema)
    .then(res => console.log('schema loaded'))
    .catch(err => console.error(err))
    .then(() => sendAllQueries(queriesArray))
    .then(res => console.log('seed successful'))
    .catch(err => console.log(err))


