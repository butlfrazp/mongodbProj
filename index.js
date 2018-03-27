//calling outside dependencies
const express = require('express');
const request = require('request');
const Client = require('coinbase').Client;
const bodyParser = require('body-parser');
const path = require('path');

//local dependencies
const COINBASE = require('./configs/coinbase');
const CB_PARAMS = require('./configs/coinbaseParams.js');

//mongoose models
const {Buy} = require('./server/models/buy');
const {Sell} = require('./server/models/sell');
const {account} = require('./server/misc/CBAccount');

const {
  buy,
  sell,
  allCurrencies,
  currency,
  getDefaultPrice,
  getPrice
} = require('./server/routes');

//initializing server
const app = express();
app.use(bodyParser.json());

//creating path for public folder
const publicPath = path.join(__dirname, "./public");
app.use(express.static(publicPath));

const PORT = process.env.PORT || 3000;;

const {
  CURRENCY_CODE
} = CB_PARAMS;

const {
  API_KEY,
  API_SECRET,
  VERSION
} = COINBASE;

const client = new Client({
  'apiKey': API_KEY,
  'apiSecret': API_SECRET,
  'version': VERSION
});;

app.listen(PORT, () => {

});

app.get("/myaccount", (req, res) => {

});

app.get("/myaccount/balance", (req, res) => {

});

app.post("/sell", (req, res) => {

});

app.post("/buy", (req, res) => {

});

app.get("/portfolio", (req, res) => {

});

app.get("/past_transactions", (req, res) => {

});

app.get("/currency", (req, res) => {

});

app.get("/currency/:country", (req, res) => {

});

app.get("/prices", (req, res) => {

});

app.get("/prices/:country", (req, res) => {

});

app.get("/holdings", (req, res) => {

});

app.get("/")

module.exports = {
  app
};
