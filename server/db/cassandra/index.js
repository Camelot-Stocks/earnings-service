const cassandra = require('cassandra-driver');
const log = require('fancy-log');

const localDatacenter = 'Test Cluster';
const loadBalancingPolicy = new cassandra.policies.loadBalancing.DCAwareRoundRobinPolicy(localDatacenter); 
const clientOptions = {
   policies : {
      loadBalancing : loadBalancingPolicy
   },
   contactPoints: ['172.31.17.118']
}; 

const client = new cassandra.Client(clientOptions);
client.connect(log('Connected to Cassandra'));

module.exports = { client };