# Robinhood-Earnings

Setup steps:
1. `npm install`
2. run `npm run build`
If you're developing, you need to use npm run build:watch
3. run `npm run db:setup`
4. `npm start`

# API Routes

GET: /earnings/:id gets graph data for a given stock
POST: /earnings/:id adds new datapoint for given stock
PUT: /earnings/:id/:date updates the most recent data point for a given stock
DELETE: /earnings/:id deletes stock from database