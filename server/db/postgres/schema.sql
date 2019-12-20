DROP TABLE IF EXISTS company, earnings;

CREATE TABLE company (
    id  SERIAL PRIMARY KEY,
    name  varchar,
    symbol  varchar(5) UNIQUE
);

CREATE TABLE earnings (
    id SERIAL PRIMARY KEY,
    company_id integer REFERENCES company(id),
    quarter integer,
    year integer,
    estimated float,
    actual float
);