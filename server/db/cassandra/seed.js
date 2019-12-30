const fs = require('fs');
const path = require('path');
const log = require('fancy-log');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
// const { client } = require('./index.js');
const { rows } = require('./dataGenerator.js');

// PLAN:
// take data from rows
// write it to CSVs
// load those CSVs into Cassandra

let writeStream = fs.createWriteStream(path.join(__dirname, './table.csv'));
log('starting csv write');

function writeAll(writer, callback) {
  let i = rows.length - 1;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const data = rows[i];
      if (i === 0) {
        writer.write(data, callback);
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(data);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

writeAll(writeStream, () => {
  writeStream.end();
  log('wrote all data to csv');
});

// writeStream.write(rows);
// // LOOK INTO DRAIN EVENT
// writeStream.on('finish', () => {
//     log('wrote all data to csv');
// })
//   .on('error', () => log(error));
// writeStream.end();
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
