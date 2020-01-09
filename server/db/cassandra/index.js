const cassandra = require('cassandra-driver');
const log = require('fancy-log');

const localDatacenter = 'us-west';
const loadBalancingPolicy = new cassandra.policies.loadBalancing.DCAwareRoundRobinPolicy(localDatacenter); 
const clientOptions = {
   policies : {
      loadBalancing : loadBalancingPolicy
   },
   contactPoints: ['52.52.21.106:9042']
}; 

const client = new cassandra.Client(clientOptions);
client.connect(log('Connected to Cassandra'));

module.exports = { client };