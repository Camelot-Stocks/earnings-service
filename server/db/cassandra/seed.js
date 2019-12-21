const fs = require('fs');
const path = require('path');
const log = require('fancy-log');
const { client } = require('./index.js');
const { rows } = require('./dataGenerator.js');




// --------------------------------------
// FAILED METHODS OF IMPORTING SCHEMA:
// const query1 = `CREATE KEYSPACE IF NOT EXISTS camelot_earnings
// WITH replication = { 'class' : 'SimpleStrategy' , 'replication_factor' : '2'};`;
// const query2 = `DROP TABLE IF EXISTS camelot_earnings.stock;`;
// const query3 = `CREATE TABLE camelot_earnings.stock (
//     symbol varchar(5),
//     name varchar,
//     quarter int,
//     year int,
//     estimated float,
//     actual float,
//     PRIMARY KEY (symbol, year, quarter))
// WITH CLUSTERING ORDER BY (year DESC, quarter DESC);`
// const queries = [
//    { query: query1 },
//    { query: query2 },
//    { query: query3 }
// ];
// Promise-based call
// client.batch(queries)
//   .then(() => log('schema queries successful'))
//   .catch((err) => log('schema load unsuccessful', err));

// client.execute(`CREATE KEYSPACE IF NOT EXISTS camelot_earnings
// WITH replication = { 'class' : 'SimpleStrategy' , 'replication_factor' : '2'};`)
//   .then(() => {
//       client.execute(`DROP TABLE IF EXISTS camelot_earnings.stock;`)
//   })
//   .then(() => client.execute(query3))
//   .then(() => log('schema load successful'))
//   .catch((err) => log(err));

// const location = path.join(__dirname, 'schema.cql');
// const schema = fs.readFileSync(location).toString();
// client.execute(schema)
//     .then(res => log('schema loaded'))
//     .catch(err => log.error(err));
    // .then(() => sendAllQueries(queriesArray))
    // .then(res => log('seed successful'))
    // .catch(err => log.error(err))
