//calling outside dependencies
const express = require('express');
const request = require('request');
const Client = require('coinbase').Client;

//local dependencies
const COINBASE = require('./configs/coinbase');
const CB_PARAMS = require('./configs/coinbaseParams.js');

//initializing server
const app = express();

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
});

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

// app.get("/currency", (req, res) => {
//   client.getCurrencies(function(err, currencies) {
//     if (err) {
//       res.status(400).send(err);
//       return;
//     }
//     res.send(currencies);
//   });
// });

app.get("/currency/:country", (req, res) => {
  const param = req.params.country;
  if (param == "") {
      client.getCurrencies(function(err, currencies) {
        if (err) {
          res.status(400).send(err);
          return;
        }
        res.send(currencies);
      });
  }else{
    client.getCurrencies(function(err, currencies) {
      if (err) {
        res.status(400).send(err);
        return;
      }
      for (var i = 0; i < currencies.data.length; i++) {
        if (currencies.data[i].id == param) {
          res.send(currencies.data[i]);
          return;
        }
      }
      res.status(400).send("Sorry could not find the currency");
    });
  }
});

app.get("/prices", (req, res) => {
  client.getSpotPrice({'currency': CURRENCY_CODE}, function(err, price) {
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.send(price);
  });
});
