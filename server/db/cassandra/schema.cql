CREATE KEYSPACE IF NOT EXISTS camelot_earnings
WITH replication = { 'class' : 'SimpleStrategy' , 'replication_factor' : '2'};

DROP TABLE IF EXISTS camelot_earnings.stock;

CREATE TABLE camelot_earnings.stock (
    symbol varchar,
    name varchar,
    quarter int,
    year int,
    estimated float,
    actual float,
    PRIMARY KEY (symbol, year, quarter))
WITH CLUSTERING ORDER BY (year DESC, quarter DESC);