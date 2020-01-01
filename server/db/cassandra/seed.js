const path = require('path');
const log = require('fancy-log');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { client } = require('./index.js');

const copyToDb = async () => {
  const location = path.resolve(__dirname, 'queries.cql');
  log(location);
  return exec(`cqlsh -u cassandra -p cassandra -f ./server/db/cassandra/queries.cql`, { maxBuffer: 5000*1024 }); //--debug -e '${query}'`).catch(log);
}

const seed = async () => {
  await client.execute(`TRUNCATE camelot_earnings.stock;`);
  log('existing tables truncated');
  await copyToDb();
  log('all data seeded');
}

seed().catch(log);