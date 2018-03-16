//calling outside dependencies
const express = require('express');
const request = require('request');
const Client = require('coinbase').Client;
const bodyParser = require('body-parser');

//local dependencies
const COINBASE = require('./configs/coinbase');
const CB_PARAMS = require('./configs/coinbaseParams.js');

//mongoose models
const {Buy} = require('./server/models/buy');
const {Sell} = require('./server/models/sell');

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
  console.log(`Started up on Port ${PORT}`);
});

app.get("/", (req, res) => {
  client.getAccounts({}, function(err, accounts) {
    res.send(accounts);
    accounts.forEach(function(acct) {
      console.log(acct.name + ': ' + acct.balance.amount + ' ' + acct.balance.currency);
    });
  });
});

app.post("/sell", (req, res) => {
  sell(req, res, client);
});

app.post("/buy", (req, res) => {
  buy(req, res, client);
});

app.get("/portfolio", (req, res) => {
  var data = {};
  const params = "price quantity symbol"
  Sell.find({}, params, (err, sell) => {
    if (err) {
      res.status(400).send(err);
      return;
    }
    data.sell = sell;
    Buy.find({}, params, (err, buy) => {
      if (err) {
        res.status(400).send(err);
        return;
      }
      data.buy = buy;
      res.send(data);
    })
  })
});


app.get("/currency", (req, res) => {
  allCurrencies(req, res, client);
});

app.get("/currency/:country", (req, res) => {
  currency(req, res, client);
});

app.get("/prices", (req, res) => {
  getDefaultPrice(req, res, client);
});

app.get("/prices/:country", (req, res) => {
  getPrice(req, res, client);
});


module.exports = {
  app
};
