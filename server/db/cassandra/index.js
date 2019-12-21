const cassandra = require('cassandra-driver');
const log = require('fancy-log');

const localDatacenter = 'datacenter1';
const loadBalancingPolicy = new cassandra.policies.loadBalancing.DCAwareRoundRobinPolicy(localDatacenter); 
const clientOptions = {
   policies : {
      loadBalancing : loadBalancingPolicy
   },
   contactPoints: ['127.0.0.1']
}; 

const client = new cassandra.Client(clientOptions);
client.connect((err, res) => log(err, res));

module.exports = { client };