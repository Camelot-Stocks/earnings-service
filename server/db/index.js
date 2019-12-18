const mongoose = require('mongoose');
const env = process.env.NODE_ENV;
const mongoUri = `mongodb://localhost/graph`;

const db = mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = db;
