CREATE KEYSPACE IF NOT EXISTS camelot_earnings 
WITH replication = {'class': 'NetworkTopologyStrategy', 'replication_factor': 2};

USE camelot_earnings;

DROP TABLE IF EXISTS stock;

CREATE TABLE stock (
    symbol varchar(5),
    name varchar,
    quarter int,
    year int,
    estimated float,
    actual float,
    PRIMARY KEY (symbol))
WITH CLUSTERING ORDER BY (year DESC, quarter DESC);