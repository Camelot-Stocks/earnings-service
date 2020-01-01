const faker = require('faker');
const log = require('fancy-log');
const fs = require('fs');
const path = require('path');


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
    var company = faker.company.companyName(0);
    for (let i of years) {
        for (let j of quarters) {
            var delta = (Math.random() - 0.5) * base / 100;
            // column order: symbol, company, quarter, year, est, act
            prices += `${symbol},${i},${j},${Number.parseFloat(base + delta).toFixed(2)},${Number.parseFloat(base - delta).toFixed(2)},${company}\n`;
        }
    }
    return prices;
}

// module.exports = { tickers, createPrices };

function writeAll () {
    // Write data to CSV (98.7 million records)
    let writeStream = fs.createWriteStream(path.join(__dirname, './table.csv'));
    log('starting csv write');
    let i = tickers.length;
    function write() {
      let ok = true;
      do {
        i -= 1;
        if (i % 1000000 === 0) {
          log('writing next 8 million')
        }
        const data = createPrices(tickers[i]);
        if (i === 0) {
          writeStream.write(data);
          writeStream.end();
          log('wrote all data to csv');
        } else {
          ok = writeStream.write(data);
        }
      } while (i > 0 && ok);
      if (i > 0) {
        writeStream.once('drain', write);
      }
    }
  write();
  };

  writeAll();