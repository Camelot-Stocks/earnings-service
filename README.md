# Robinhood-Earnings

Setup steps:
1. `npm install`
2. run `npm run build`
If you're developing, you need to use npm run build:watch
3. run `npm run db:setup`
4. `npm start`

# API Routes

GET: /earnings/:symbol
Gets graph data for a given stock
Example data:
{
    "_id": "5de3095e4b61279c206a2624",
    "name": "Alphabet",
    "symbol": "GOOGL",
    "data": [
      {
        "year": 2018,
        "quarter": 1
        "estimated": 36.66,
        "actual": 27.43
      },
      {
        "year": 2018,
        "quarter": 2,
        "estimated": 25.82,
        "actual": 28.87
      },
      {
        "year": 2018,
        "quarter": 3,
        "estimated": 13.30,
        "actual": 30.48
      },
      {
        "year": 2018,
        "quarter": 4,
        "estimated": 31.48,
        "actual": 30.08
      },
      {
        "year": 2019,
        "quarter": 1,
        "estimated": 18.63,
        "actual": 10.50
      },
      {
        "year": 2019,
        "quarter": 2,
        "estimated": 28.14,
        "actual": 30.86
      },
      {
        "year": 2019,
        "quarter": 3,
        "estimated": 22.08,
        "actual": 30.33
      },
      {
        "year": 2019,
        "quarter": 4,
        "estimated": 19.83,
        "actual": 25.54
      }
    ]
  }

POST: /earnings/:symbol 
Adds new datapoint (quarter, estimated, actual as null) for given stock
Request: {
    symbol: AAPL,
    year: 2020,
    quarter: 1,
    estimated: 255.34,
    actual: null
}

PUT: /earnings/:symbol 
Updates the most recent quarter's Actual value for a given stock
Request: {
    symbol: AAPL,
    year: 2019,
    quarter: 4,
    actual: 240.99
}

PATCH:
If there are 9 data points, delete the oldest data point

DELETE: /earnings/:symbol 
Deletes stock from database