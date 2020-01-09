require('newrelic');
const express = require('express')
const path = require('path')
const { client } = require('./db/cassandra/index.js');
const cors = require('cors')
const app = express()

app.use(express.json());
app.use(cors())
app.use(express.urlencoded());
app.use('/:symbol', express.static(path.resolve(__dirname, '../public')))
app.use(express.static(path.resolve(__dirname, '../public')))

app.get('/earnings/:symbol', (req, res) => {
  const symbol = req.params.symbol;
  client.execute(`SELECT * FROM camelot_earnings.stock WHERE symbol='${symbol}' ORDER BY year ASC;`)
    .then(result => res.send(result.rows))
    .catch(err => console.log(err));
})

app.post('/earnings/:symbol', (req, res) => {
  const symbol = req.params.symbol;
  const year = req.body.year;
  const quarter = req.body.quarter;
  const estimated = req.body.estimated;
  const name = req.body.name;
  client.execute(`INSERT INTO camelot_earnings.stock (symbol,year,quarter,actual,estimated,name) VALUES('${symbol}',${year},${quarter},null,${estimated},'${name}');`)
    .then(result => res.sendStatus(200))
    .catch(err => res.send(err));
})

app.put('/earnings/:symbol', (req, res) => {
  const symbol = req.params.symbol;
  const year = req.body.year;
  const quarter = req.body.quarter;
  const actual = req.body.actual;
  client.execute(`UPDATE camelot_earnings.stock SET actual=${actual} WHERE symbol='${symbol}' AND year=${year} AND quarter=${quarter};`)
    .then(result => res.sendStatus(200))
    .catch(err => console.log(err));
})

app.delete('/earnings/:symbol', (req, res) => {
  const symbol = req.params.symbol;
  const year = req.body.year;
  const quarter = req.body.quarter;
  client.execute(`DELETE actual FROM camelot_earnings.stock WHERE symbol='${symbol}' AND year=${year} AND quarter=${quarter};`)
    .then(result => res.sendStatus(200))
    .catch(err => console.log(err));
})

module.exports = app
