// const fs = require('fs');
const path = require('path');
const log = require('fancy-log');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
// const { tickers, createPrices } = require('./dataGenerator.js');
const { client } = require('./index.js');



// async function writeAll () {
//   // Write data to CSV (98.7 million records)
//   let writeStream = fs.createWriteStream(path.join(__dirname, './table.csv'));
//   log('starting csv write');
//   let i = tickers.length;
//   async function write() {
//     let ok = true;
//     do {
//       i -= 1;
//       if (i % 1000000 === 0) {
//         log('writing next 8 million')
//       }
//       const data = createPrices(tickers[i]);
//       if (i === 0) {
//         writeStream.write(data);
//         writeStream.end();
//         log('wrote all data to csv');
//         return true;
//       } else {
//         ok = writeStream.write(data);
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
//       writeStream.once('drain', write);
//     }
//   }
// await write();
// return true;
// };

const copyToDb = async () => {
  // const location = '/Users/jessica/Documents/GitHub/Hack Reactor/Camelot/earnings-service/server/db/cassandra/table.csv'
  const location = path.resolve(__dirname, 'queries.cql');
  log(location);
  // const query = `COPY camelot_earnings.stock (symbol, year, quarter, actual, estimated, name) FROM '${location}' WITH DELIMITER=',' AND HEADER=FALSE;`;
  return exec(`cqlsh -u cassandra -p cassandra -f ./server/db/cassandra/queries.cql`, { maxBuffer: 5000*1024 }); //--debug -e '${query}'`).catch(log);
}

const seed = async () => {
  // await Promise.resolve(writeAll());
  await client.execute(`TRUNCATE camelot_earnings.stock;`);
  log('existing tables truncated');
  await copyToDb();
  log('all data seeded');
}

seed().catch(log);


// Load CSV into Cassandra
// client.execute(`COPY keyspace.tableName (col1,col2) FROM './table.csv' WITH DELIMITER=',' AND HEADER=FALSE;`);


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
