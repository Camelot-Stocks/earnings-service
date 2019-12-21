DROP TABLE IF EXISTS company, earnings;

CREATE TABLE company (
    id  SERIAL,
    name  varchar,
    symbol  varchar PRIMARY KEY
);

CREATE TABLE earnings (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR REFERENCES company(symbol),
    quarter integer,
    year integer,
    estimated float,
    actual float
);