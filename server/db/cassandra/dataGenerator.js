const faker = require('faker');
const log = require('fancy-log');

function createTickers() {
    const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var tickers = [];
    const length = 26;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            for (let k = 0; k < length; k++) {
                for (let l = 0; l < length; l++) {
                    tickers.push(`${alphabet[i]}${alphabet[j]}${alphabet[k]}${alphabet[l]}`)
                }
            }
        }
    }
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            for (let k = 0; k < length; k++) {
                for (let l = 0; l < length; l++) {
                    for (let m = 0; m < length; m++) {
                        tickers.push(`${alphabet[i]}${alphabet[j]}${alphabet[k]}${alphabet[l]}${alphabet[m]}`)
                    }
                }
            }
        }
    }
    return tickers;
}

const tickers = createTickers();

function createPrices(symbol) {
    const years = [2018, 2019];
    const quarters = [1, 2, 3, 4];
    var base = Math.random() * 200;
    var prices = '';
    var company = faker.company.companyName();
    for (let i of years) {
        for (let j of quarters) {
            var delta = (Math.random() - 0.5) * base / 100;
            // column order: symbol, company, quarter, year, est, act
            prices += `'${symbol}','${company}',${j},${i},${Number.parseFloat(base + delta).toFixed(2)},${Number.parseFloat(base - delta).toFixed(2)}\n`;
        }
    }
    return prices;
}
// var rows = [];
// for (let ele of tickers) {
//     // add fields: company name, quarter, year,
//     // estimated and actual values
//     rows.push(createPrices(ele));
// }

// log('created rows');

// Right now, rows is an array. Each element of the array is a string, a new data point--Cassandra documents/rows

module.exports = { tickers, createPrices };