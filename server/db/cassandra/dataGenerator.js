const faker = require('faker');
const log = require('fancy-log');
// const { tickers } = require('../postgres/dataGenerator.js');
tickers = ['AAPL', 'GOOGL'];

const years = [2018, 2019];
const quarters = [1, 2, 3, 4];
function createPrices(symbol) {
    var base = Math.random() * 200;
    var prices = [];
    var company = faker.company.companyName();
    for (let i of years) {
        for (let j of quarters) {
            var delta = (Math.random() - 0.5) * base / 100;
            prices.push({
                symbol: symbol,
                name: company,
                quarter: j,
                year: i,
                estimated: Number.parseFloat(base + delta).toFixed(2),
                actual: Number.parseFloat(base - delta).toFixed(2),
            })
        }
    }
    return prices;
}
var rows = [];
for (let ele of tickers) {
    // add fields: company name, quarter, year,
    // estimated and actual values
    rows.push(createPrices(ele));
}

console.log(rows);

// Right now, rows is an array. Each element is another array representing a single company
// Inside that second array are a bunch of objects, which are each Cassandra documents/rows

module.exports = { rows };