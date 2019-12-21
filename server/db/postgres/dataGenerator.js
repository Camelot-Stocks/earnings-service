// const companyNames = require('../templates/companyNames');
const faker = require('faker');
const log = require('fancy-log');
var tickers = [];
const length = 26; // should be 26 for final seeding
var batchSize = 1000000; // should be 500,000 for final seeding (or thereabouts)

// create company table first
// push all stock symbols to tickers array
// when creating earnings table, iterate thru tickers array to create data
log('hello from dataGenerator');
const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

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
// ticker now has 12,338,352 elements, stock symbols (strings) of length 4 and 5
log('symbol generation complete');
// for first 500,000 elements of ticker
//   find a random company name
//   add element and company name to query string
// send query
var queriesArray = [];

function batchCreate(start, batchSize) {
  var query = `INSERT INTO company (name, symbol) VALUES `;
  for (let i = start; i < (start + batchSize); i++) {
      var name = faker.company.companyName();
      query += `($$${name}$$,$$${tickers[i]}$$),`;
  }
  queriesArray.push(query.substring(0, query.length-1) + `;`);
}

for (let i = 0; i < 11; i++) {
    batchCreate(i * batchSize,batchSize);
}

module.exports = { queriesArray };




// companyNames is a promise which resolves to an object
// Keys are company names and values are stock symbols
// Most, but not all, company names are strings. Stock symbols are strings.

// const createObjects = () => {
//   return companyNames.then(companies => {
//       var values = ``;
//       Object.entries(companies).forEach((entry, idx) => {
//           values += entry[1] + entry[0]
//           // also add the rest of the fields
//       })
//       console.log(values);
//   })
//   .then(() => console.log(values))
// }